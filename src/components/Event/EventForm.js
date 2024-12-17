// src/components/Event/EventForm.js
import React, { useState, useEffect } from 'react';

// Define event types
const EVENT_TYPES = [
    { value: 'work', label: 'Work', color: '#FF6B6B', fontColor: 'black' },
    { value: 'personal', label: 'Personal', color: '#4ECDC4', fontColor: 'black' },
    { value: 'health', label: 'Health', color: '#45B7D1', fontColor: 'black' },
    { value: 'social', label: 'Social', color: '#FDCB6E', fontColor: 'black' },
    { value: 'other', label: 'Other', color: '#6C5CE7', fontColor: 'black' }
];

const EventForm = ({ onSave, existingEvent }) => {
    const [eventData, setEventData] = useState({
        name: '',
        startTime: '',
        endTime: '',
        description: '',
        type: 'other' // Default type
    });

    useEffect(() => {
        if (existingEvent) {
            setEventData({
                name: existingEvent.name,
                startTime: existingEvent.startTime,
                endTime: existingEvent.endTime,
                description: existingEvent.description,
                type: existingEvent.type || 'other'
            });
        }
    }, [existingEvent]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate time inputs
        if (eventData.startTime >= eventData.endTime) {
            alert('End time must be later than start time.');
            return;
        }

        onSave(eventData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
                <label htmlFor="name">Event Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={eventData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="startTime">Start Time:</label>
                <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={eventData.startTime}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="endTime">End Time:</label>
                <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={eventData.endTime}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="type">Event Type:</label>
                <select
                    id="type"
                    name="type"
                    value={eventData.type}
                    onChange={handleChange}
                >
                    {EVENT_TYPES.map(type => (
                        <option 
                            key={type.value} 
                            value={type.value}
                            style={{ 
                                backgroundColor: type.color,
                                color: type.fontColor || 'black'
                            }}
                        >
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">
                {existingEvent ? 'Update Event' : 'Add Event'}
            </button>
        </form>
    );
};

export const EVENT_TYPES_MAP = EVENT_TYPES.reduce((acc, type) => {
    acc[type.value] = type.color;
    return acc;
}, {});

export default EventForm;