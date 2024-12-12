import React, { useContext, useState } from 'react';
import { EventContext } from '../contexts/EventContext';
import { EVENT_TYPES_MAP } from './Event/EventForm';
import EventForm from './Event/EventForm';
import { filterEventsByKeyword } from '../utils/eventUtils';
import { exportToJSON, exportToCSV, downloadFile } from '../utils/eventUtils';

const SidePanel = () => {
    const { events } = useContext(EventContext);
    const [keyword, setKeyword] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Filter events by keyword and month/year
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        const matchesKeyword = filterEventsByKeyword([event], keyword).length > 0;
        const matchesMonth = eventDate.getMonth() === selectedMonth && 
                             eventDate.getFullYear() === selectedYear;
        return matchesKeyword && matchesMonth;
    });

    // Generate month and year options
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Export handlers
    const handleExportJSON = () => {
        const jsonContent = exportToJSON(filteredEvents);
        downloadFile(
            jsonContent, 
            `events_${months[selectedMonth]}_${selectedYear}.json`, 
            'json'
        );
    };

    const handleExportCSV = () => {
        const csvContent = exportToCSV(filteredEvents);
        downloadFile(
            csvContent, 
            `events_${months[selectedMonth]}_${selectedYear}.csv`, 
            'csv'
        );
    };

    return (
        <div className="side-panel">
            <h2>Event List</h2>
            
            {/* Month and Year Filters */}
            <div className="export-filters">
                <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                    {months.map((month, index) => (
                        <option key={month} value={index}>{month}</option>
                    ))}
                </select>
                
                <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Export Buttons */}
            <div className="export-buttons">
                <button onClick={handleExportJSON}>Export JSON</button>
                <button onClick={handleExportCSV}>Export CSV</button>
            </div>

            {/* Existing search and event list */}
            <input 
                type="text" 
                placeholder="Filter events by keyword..." 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
            />
            
            <div className="events-list">
                {filteredEvents.map((event, index) => (
                    <div 
                        key={index} 
                        className="event-item"
                        style={{ 
                            backgroundColor: EVENT_TYPES_MAP[event.type] || EVENT_TYPES_MAP['other'],
                            color: 'white'
                        }}
                    >
                        <h4>{event.name}</h4>
                        <p>{event.date} | {event.startTime} - {event.endTime}</p>
                        <p>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidePanel;