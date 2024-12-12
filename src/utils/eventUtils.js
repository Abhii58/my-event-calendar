// src/utils/eventUtils.js

/**
 * Check if two events overlap
 * @param {object} event1 
 * @param {object} event2 
 * @returns {boolean}
 */
export const doEventsOverlap = (event1, event2) => {
    const start1 = new Date(`${event1.date}T${event1.startTime}`);
    const end1 = new Date(`${event1.date}T${event1.endTime}`);
    const start2 = new Date(`${event2.date}T${event2.startTime}`);
    const end2 = new Date(`${event2.date}T${event2.endTime}`);

    return start1 < end2 && start2 < end1;
};
export const exportToJSON = (events) => {
    return JSON.stringify(events, null, 2);
};
export const exportToCSV = (events) => {
    // Define CSV headers
    const headers = [
        'Name', 
        'Start Time', 
        'End Time', 
        'Date', 
        'Type', 
        'Description'
    ];
    const csvRows = events.map(event => [
        `"${event.name}"`,
        `"${event.startTime}"`,
        `"${event.endTime}"`,
        `"${event.date}"`,
        `"${event.type}"`,
        `"${event.description || ''}"`
    ].join(','));

    // Combine headers and rows
    return [headers.join(','), ...csvRows].join('\n');
};

/**

/**
 * Filter events by a keyword
 * @param {Array} events 
 * @param {string} keyword 
 * @returns {Array}
 *  @param {string} content 
 * @param {string} fileName 
 * @param {string} type 
 
 */
export const filterEventsByKeyword = (events, keyword) => {
    return events.filter(event => 
        event.name.toLowerCase().includes(keyword.toLowerCase()) || 
        event.description.toLowerCase().includes(keyword.toLowerCase())
    );
};
export const downloadFile = (content, fileName, type) => {
    // Create a Blob with the content
    const blob = new Blob([content], { type: `text/${type}` });
    
    // Create a link element
    const link = document.createElement('a');
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Set link attributes
    link.href = url;
    link.download = fileName;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Release the URL object
    URL.revokeObjectURL(url);
};
/**
 * Sort events by start time
 * @param {Array} events 
 * @returns {Array}
 */
export const sortEventsByStartTime = (events) => {
    return events.sort((a, b) => {
        const startA = new Date(`${a.date}T${a.startTime}`);
        const startB = new Date(`${b.date}T${b.startTime}`);
        return startA - startB;
    });
};
