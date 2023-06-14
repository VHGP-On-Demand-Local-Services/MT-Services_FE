import React, { useState } from 'react'

const useFortmatPhone = (phoneNumber) => {
    const [formatPhoneNumber, setFormatPhoneNumber] = useState('')
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    const formatNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setFormatPhoneNumber(formatNumber);
    return formatNumber;
}

export default useFortmatPhone;