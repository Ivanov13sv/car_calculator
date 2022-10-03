import { FC, ChangeEvent, useState, useRef } from 'react';
import { InitialDepositInputProps, InputTypeProps } from 'types/IInput';
import { getInitialDeposit, numberWithSpaces } from 'utils';
import styles from './style.module.scss';

export const Input: FC<InputTypeProps> = ({ type, value, price,disabled, ...rest }) => {
    const [isFocus, setFocus] = useState(false);

    const dividedValue = numberWithSpaces(value);
    const formattedInitialDeposit = numberWithSpaces(
        getInitialDeposit(value, price)
    );

    const focusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFocus(!isFocus);
    };

    const inputClasses = isFocus
        ? `${styles.field} ${[styles[type]]} ${styles.field__focus}`
        : `${styles.field} ${[styles[type]]}`;

    if (type === 'initial') {
        return (
            <InitialDepositInput
                price={formattedInitialDeposit}
                value={dividedValue}
                type={type}
                focusHandler={focusHandler}
                isFocus={isFocus}
                disabled={disabled}
                {...rest}
            />
        );
    }

    return (
        <div className={disabled? `${inputClasses} ${styles.field__disabled}` : inputClasses}>
            <input
                className={styles.input}
                type="tel"
                value={dividedValue}
                onFocus={focusHandler}
                onBlur={focusHandler}
                {...rest}
            />
            <span>{type === 'price' ? '₽' : 'мес.'}</span>
        </div>
    );
};


const InitialDepositInput = (props: InitialDepositInputProps) => {
    const { focusHandler, isFocus, price, type, disabled, ...rest } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const inputClasses = isFocus
        ? `${styles.field} ${[styles[type]]} ${styles.field__focus}`
        : `${styles.field} ${[styles[type]]}`;

    const focusInput = () => {
        if (inputRef) {
            inputRef.current?.focus();
        }
    };

    return (
        <div className={disabled? `${inputClasses} ${styles.field__disabled}` : inputClasses} onClick={focusInput}>
            <span>{price}</span>
            <div className={styles.field__percents}>
                <input
                    className={styles.input}
                    type="tel"
                    ref={inputRef}
                    onFocus={focusHandler}
                    onBlur={focusHandler}
                    {...rest}
                />
                %
            </div>
        </div>
    );
};
