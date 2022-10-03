import { ChangeEvent } from 'react';
export interface InputTypeProps {
    type: 'initial' | 'price' | 'rent';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: number;
    price: number;
    id: string;
    disabled?: boolean;
}

export interface InitialDepositInputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    focusHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    isFocus: boolean;
    type: string;
    id: string;
    price: string;
    disabled?: boolean;
}
