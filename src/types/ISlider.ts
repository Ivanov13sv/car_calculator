import { ChangeEvent } from 'react';

export interface ISlider {
    max: number;
    min: number;
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    rangeProgress: string;
    disabled?: boolean;
}
