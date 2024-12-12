// src/components/Calendar/Calendar.js
import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { EventContext } from '../../contexts/EventContext';
import Day from './Day';
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const { moveEvent, events } = useContext(EventContext);

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

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If dropped outside a droppable, do nothing
        if (!destination) return;

        // Find the source and destination events
        const sourceDate = new Date(source.droppableId);
        const destDate = new Date(destination.droppableId);
        
        const sourceEvents = events.filter(event => 
            new Date(event.date).toDateString() === sourceDate.toDateString()
        );

        const draggedEvent = sourceEvents[source.index];

        // Attempt to move the event
        const moved = moveEvent(draggedEvent, destDate);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={handlePrevMonth}>Previous</button>
                    <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={handleNextMonth}>Next</button>
                </div>
                <div className="calendar-grid">
                    {daysInMonth.map((day, index) => (
                        <Day 
                            key={index} 
                            date={day} 
                            isCurrent={day && day.toDateString() === new Date().toDateString()} 
                            isWeekend={day && (day.getDay() === 0 || day.getDay() === 6)} 
                        />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};

export default Calendar;
