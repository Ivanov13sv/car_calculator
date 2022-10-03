import { FC, MouseEvent } from 'react';
import { IBurgerButton } from 'types/IBurgerButton';
import styles from './style.module.scss';

export const BurgerButton: FC<IBurgerButton> = ({ isOpen, onClick }) => {
    const burgerClasses = isOpen
        ? `${styles.burgerBtn} ${styles.burgerBtn__active}`
        : styles.burgerBtn;

    const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <div className={burgerClasses} onClick={onClickHandler}>
            <span className={styles.middleLine}/>
        </div>
    );
};
