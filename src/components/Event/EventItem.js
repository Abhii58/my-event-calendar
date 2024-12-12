// src/components/Event/EventItem.js
import React from 'react';
import { EventContext } from '../../contexts/EventContext';
const EventItem = ({ event, index, onEdit, onDelete }) => {
   
    return (
        <div className="event-item">
            <h4>{event.name}</h4>
            <p>{event.startTime} - {event.endTime}</p>
            <p>{event.description}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button> 
           
                           
        </div>
    );
};

export default EventItem;
