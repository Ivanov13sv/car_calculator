import { useState } from 'react';
import { SliderInput } from 'components/UI/SliderInput';
import { getId, getMonthPay, getTotalAmount, numberWithSpaces } from 'utils';
import { Button } from 'components/UI/Button';
import { useFetching } from 'hooks/useFetching';
import { Modal } from 'components/UI/Modal';
import { UIstate } from 'components/UIstate';
import { BurgerButton } from 'components/UI/BurgerButton';
import { IUserApplication } from 'types/IUserApplication';
import { ApiService } from 'API';
import { NotificationProvider } from 'components/UI/Notification/NotificationProvider';
import { INotification, INotificationType } from 'types/INotification';
import styles from './style.module.scss';

export const CarCalculator = () => {
    const [carPrice, setCarPrice] = useState(3300000);
    const [initialFee, setInitialFee] = useState(10);
    const [months, setMonths] = useState(60);
    const [notification, setNotification] = useState<INotification[]>([]);

    const removeNotification = (id: number) => {
        setNotification(notification.filter((item) => item.id !== id));
    };

    const addNotification = (type: INotificationType, message: string) => {
        const newNotification: INotification = {
            id: Date.now(),
            message,
            type,
        };
        setNotification([...notification, newNotification]);
    };

    const monthPay = getMonthPay(carPrice, initialFee, months);
    const total = getTotalAmount(initialFee, carPrice, months, monthPay);

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [fetchingCalcData, loading] = useFetching(async () => {
        const calcData: IUserApplication = {
            initial: initialFee,
            monthPay,
            months,
            price: carPrice,
            totalPrice: total,
        };
        try {
            await ApiService.sendApplication(calcData);
            addNotification(INotificationType.success, 'Заявка отправлена!');
        } catch (error) {
            if (error instanceof Error) {
                addNotification(INotificationType.error, error.message);
            }
        }
    });

    return (
        <>
            <NotificationProvider
                notifications={notification}
                removeNotification={removeNotification}
            />
            <section className={styles.calculator}>
                {modal && (
                    <Modal isOpen={modal} setOpen={setModal}>
                        <UIstate />
                    </Modal>
                )}
                <div className={styles.burger}>
                    <BurgerButton isOpen={modal} onClick={toggleModal}>
                        UI
                    </BurgerButton>
                </div>

                <h1 className={styles.calculator__title}>
                    Рассчитайте стоимость автомобиля в лизинг
                </h1>
                <form
                    className={styles.calculator__form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchingCalcData();
                    }}
                >
                    <div className={styles.form__fields}>
                        <SliderInput
                            id={getId()}
                            type="price"
                            label="Стоимость автомобиля"
                            min={1000000}
                            max={6000000}
                            value={carPrice}
                            setValue={setCarPrice}
                            disabled={loading}
                        />
                        <SliderInput
                            id={getId()}
                            type="initial"
                            label="Первоначальный взнос"
                            price={carPrice}
                            min={10}
                            max={60}
                            value={initialFee}
                            setValue={setInitialFee}
                            disabled={loading}
                        />

                        <SliderInput
                            id={getId()}
                            type="rent"
                            label="Срок лизинга"
                            min={10}
                            max={60}
                            value={months}
                            setValue={setMonths}
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.calculator__result}>
                        <div className={styles.result__item}>
                            <span className={styles.result__item_title}>Сумма договра лизинга</span>
                            <div className={styles.result__item_body}>
                                {numberWithSpaces(total)} <span>₽</span>
                            </div>
                        </div>
                        <div className={styles.result__item}>
                            <span className={styles.result__item_title}>Ежемесячный платеж от</span>
                            <div className={styles.result__item_body}>
                                {numberWithSpaces(monthPay)}
                                <span>₽</span>
                            </div>
                        </div>
                        <Button isLoading={loading}>Оставить заявку</Button>
                    </div>
                </form>
            </section>
        </>
    );
};
