import { useState, useEffect } from 'react';

const useFormatCurrency = (amount) => {
    const [formattedAmount, setFormattedAmount] = useState('');

    useEffect(() => {
        const formatCurrency = (number) => {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
            return formatter.format(number);
        };

        const cleanedAmount = amount.replace(/[^\d]/g, '');
        const formattedNumber = formatCurrency(cleanedAmount);
        setFormattedAmount(formattedNumber);
    }, [amount]);

    return formattedAmount;
};

export default useFormatCurrency;