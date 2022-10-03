import { ChangeEvent, FC, useEffect, useState } from 'react';
import { getSliderProgress, stringToNumber } from 'utils/index';
import { Slider } from 'components/UI/Slider';
import { ISliderInputProps } from 'types/ISliderInput';
import { Input } from '../Input';
import styles from './style.module.scss';

export const SliderInput: FC<ISliderInputProps> = (props) => {
    const { max, min, value, setValue, label, type, id, disabled } = props;

    const price = type === 'initial' ? props.price : 0;

    const [rangeProgress, setRangeProgress] = useState(0);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const numberValue = stringToNumber(e.target.value);
        if (numberValue) {
            setValue(numberValue);
            if (numberValue > max) setValue(max);
        }
        if (e.target.value.length <= 0) setValue(0);
    };

    useEffect(() => {
        if (value > max) {
            setValue(max);
            return;
        }

        if (value < min) {
            setRangeProgress(0);
            const timeoutId = setTimeout(() => {
                setValue(min);
            }, 750);
            return () => clearTimeout(timeoutId);
        }

        setRangeProgress(getSliderProgress(value, max, min));
    }, [value, min, max, setValue]);

    return (
        <div className={styles.input}>
            <label className={styles.input__label} htmlFor={id}>
                {label}
            </label>
            <div className={styles.input__field}>
                <Input
                    id={id}
                    onChange={onChangeHandler}
                    price={price}
                    type={type}
                    value={value}
                    disabled={disabled}
                />
                <Slider
                    max={max}
                    min={min}
                    onChange={onChangeHandler}
                    value={value}
                    rangeProgress={`${rangeProgress}%`}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};
