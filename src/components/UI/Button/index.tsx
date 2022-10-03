import { FC } from 'react';
import { Spiner } from 'components/UI/Spiner';
import { IButton } from 'types/IButton';
import styles from './style.module.scss';

export const Button: FC<IButton> = ({
    isLoading,
    disabled,
    children,
    ...rest
}) => {
    const buttonClasses = isLoading
        ? `${styles.button} ${styles.button_loading}`
        : styles.button;

    return (
        <button disabled={disabled} className={buttonClasses} {...rest}>
            {isLoading ? <Spiner /> : children}
        </button>
    );
};
