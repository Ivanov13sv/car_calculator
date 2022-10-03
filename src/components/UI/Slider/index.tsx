import { FC } from 'react';
import { ISlider } from 'types/ISlider';
import styles from './style.module.scss';

export const Slider: FC<ISlider> = (props) => {
    const { rangeProgress, ...rest } = props;

    return (
        <input
            className={styles.slider}
            type="range"
            style={{ backgroundSize: rangeProgress }}
            {...rest}
        />
    );
};
