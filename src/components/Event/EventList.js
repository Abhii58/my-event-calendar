// src/components/Event/EventList.js
import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onEdit, onDelete }) => {
    return (
        <div>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <EventItem
                        key={index}
                        event={event}
                        index={index}
                        onEdit={() => onEdit(index)}
                        onDelete={() => onDelete(index)}
                    />
                ))
            ) : (
                <p>No events for this day.</p>
            )}
        </div>
    );
};

export default EventList;
