export const removeNonNumbers = (value: string) => {
    return value.replace(/\D/g, '');
};

export const getSliderProgress = (value: number, max: number, min: number) => {
    return ((value - min) * 100) / (max - min);
};

export const numberWithSpaces = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const stringToNumber = (str: string) => {
    return parseInt(removeNonNumbers(str), 10);
};

export const getInitialDeposit = (percent: number, price: number) => {
    return Math.round(price / 100) * percent;
};

export const getMonthPay = (
    carPrice: number,
    initialFee: number,
    months: number
) => {
    return Math.ceil(
        (carPrice - getInitialDeposit(initialFee, carPrice)) *
            ((0.035 * Math.pow(1 + 0.035, months)) /
                (Math.pow(1 + 0.035, months) - 1))
    );
};

export const getTotalAmount = (
    initialFee: number,
    carPrice: number,
    months: number,
    monthPay: number
) => {
    return getInitialDeposit(initialFee, carPrice) + months * monthPay;
};

let lastId = 0;

export const getId = (prefix = 'id') => {
    lastId++;
    return `${prefix}${lastId}`;
};
