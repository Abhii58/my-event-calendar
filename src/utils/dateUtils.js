// src/utils/dateUtils.js

/**
 * Format a date as YYYY-MM-DD
 * @param {Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Get the number of days in a given month and year
 * @param {number} year 
 * @param {number} month 
 * @returns {number}
 */
export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

/**
 * Check if a date is within a given range
 * @param {Date} date 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns {boolean}
 */
export const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
};

/**
 * Get the first day of the month
 * @param {number} year 
 * @param {number} month 
 * @returns {Date}
 */
export const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1);
};

/**
 * Get the last day of the month
 * @param {number} year 
 * @param {number} month 
 * @returns {Date}
 */
export const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0);
};
