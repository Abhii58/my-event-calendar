// src/contexts/EventContext.js
import React, { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { doEventsOverlap } from '../utils/eventUtils'; // Import the overlap utility function

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useLocalStorage('calendar-events', []);

    const addEvent = (event) => {
        const hasOverlap = events.some(existingEvent => 
            doEventsOverlap(existingEvent, event)
        );

        if (hasOverlap) {
            alert('Event overlaps with an existing event. Please choose a different time.');
            return;
        }

        setEvents(prev => [...prev, event]);
    };

    const updateEvent = (index, updatedEvent) => {
        const hasOverlap = events.some((existingEvent, i) => 
            i !== index && doEventsOverlap(existingEvent, updatedEvent)
        );

        if (hasOverlap) {
            alert('Updated event overlaps with an existing event. Please choose a different time.');
            return;
        }

        setEvents(prev => {
            const newEvents = [...prev];
            newEvents[index] = updatedEvent;
            return newEvents;
        });
    };

    const moveEvent = (event, newDate) => {
        // Create a new event with updated date
        const movedEvent = {
            ...event,
            date: newDate.toISOString()
        };

        // Check for overlaps with events on the new date
        const hasOverlap = events.some(existingEvent => 
            existingEvent.date === movedEvent.date && 
            doEventsOverlap(existingEvent, movedEvent)
        );

        if (hasOverlap) {
            alert('Cannot move event. There is an overlap with an existing event.');
            return false;
        }

        // Remove the old event and add the new one
        setEvents(prev => {
            const filteredEvents = prev.filter(e => 
                !(e.name === event.name && 
                  e.date === event.date && 
                  e.startTime === event.startTime)
            );
            return [...filteredEvents, movedEvent];
        });

        return true;
    };

    const deleteEvent = (index) => {
        setEvents(prev => prev.filter((_, i) => i !== index));
    };

    const getEventsForDate = (date) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
    };

    return (
        <EventContext.Provider value={{
            events,
            addEvent,
            updateEvent,
            moveEvent,
            deleteEvent,
            getEventsForDate
        }}>
            {children}
        </EventContext.Provider>
    );
};
