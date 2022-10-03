import { ButtonHTMLAttributes } from 'react';

export interface IBurgerButton
    extends ButtonHTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
    disabled?: boolean;
    isOpen: boolean;
}
