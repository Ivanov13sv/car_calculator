interface ISliderInput {
    label: string;
    max: number;
    min: number;
    value: number;
    setValue: (value: number) => void;
    id: string;
    disabled?: boolean;
}

interface IRangeSliderFee extends ISliderInput {
    type: 'initial';
    price: number;
}
interface IRangeSliderPrice extends ISliderInput {
    type: 'price';
}
interface IRangeSliderRent extends ISliderInput {
    type: 'rent';
}

export type ISliderInputProps = IRangeSliderFee | IRangeSliderPrice | IRangeSliderRent;