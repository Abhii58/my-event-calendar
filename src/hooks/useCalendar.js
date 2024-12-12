// src/hooks/useCalendar.js
import { useState, useEffect } from 'react';

const useCalendar = (initialDate) => {
    const [currentDate, setCurrentDate] = useState(initialDate || new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
        const days = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Calculate the first day of the month and the number of days in the month
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

        // Fill in the days array
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        for (let day = 1; day <= numberOfDaysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        setDaysInMonth(days);
    }, [currentDate]);

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return {
        currentDate,
        daysInMonth,
        goToPrevMonth,
        goToNextMonth,
    };
};

export default useCalendar;
