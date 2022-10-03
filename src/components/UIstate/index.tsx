import { FC, InputHTMLAttributes } from 'react';
import { Button } from 'components/UI/Button';
import { getId } from 'utils';
import styles from './style.module.scss';

export const UIstate = () => {
    const buttons = [
        {
            id: getId(),
            item: <Button className={styles.button}>Passive</Button>,
        },
        {
            id: getId(),
            item: (
                <Button className={`${styles.button} ${styles.button__hover}`}>
                    Hover
                </Button>
            ),
        },
        {
            id: getId(),
            item: (
                <Button
                    className={`${styles.button} ${styles.button__pressed}`}
                >
                    Pressed
                </Button>
            ),
        },
        {
            id: getId(),
            item: (
                <Button className={styles.button} disabled={true}>
                    Disabled
                </Button>
            ),
        },
        {
            id: getId(),
            item: <Button className={styles.button} isLoading={true} />,
        },
    ];

    const inputs = [
        {
            id: getId(),
            input: <ViewingInput state="passive" placeholder="Passive" />,
        },
        {
            id: getId(),
            input: <ViewingInput state="hover" placeholder="Hover" />,
        },
        {
            id: getId(),
            input: <ViewingInput state="active" placeholder="Active" />,
        },
        {
            id: getId(),
            input: <ViewingInput state="disabled" placeholder="Disabled" />,
        },
    ];

    const inputsList = inputs.map((item) => (
        <li className={styles.list__item} key={item.id}>
            {item.input}
        </li>
    ));

    const buttonsList = buttons.map((item) => (
        <li className={styles.list__item} key={item.id}>
            {item.item}
        </li>
    ));

    return (
        <section className={styles.wrapper}>
            <div className={styles.uiSection}>
                <h2 className={styles.uiSection__title}>Кнопки</h2>
                <ul className={styles.uiSection__list}>{buttonsList}</ul>
            </div>
            <div className={styles.uiSection}>
                <h2 className={styles.uiSection__title}>Ползунки</h2>
                <ul className={styles.uiSection__list}>{inputsList}</ul>
            </div>
        </section>
    );
};

interface ViewingInputProps extends InputHTMLAttributes<HTMLInputElement> {
    state: string;
}

const ViewingInput: FC<ViewingInputProps> = ({ placeholder, state }) => {
    const inputClasses = `${styles.input} ${styles[state]}`;
    return (
        <div className={inputClasses}>
            <input className={styles.field} placeholder={placeholder} />
            <input type="range" className={styles.slider} />
        </div>
    );
};
