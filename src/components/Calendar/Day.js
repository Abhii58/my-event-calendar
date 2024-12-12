import React, { useState, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { EventContext } from '../../contexts/EventContext';
import { EVENT_TYPES_MAP } from '../Event/EventForm';
import Modal from '../UI/Modal';
import EventForm from '../Event/EventForm';
import './Calendar.css';

const Day = ({ date, isCurrent, isWeekend }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { events, addEvent, updateEvent, deleteEvent, getEventsForDate, moveEvent } = useContext(EventContext);

    if (!date) {
        return <div className="day empty"></div>;
    }

    const dayEvents = getEventsForDate(date);

    const handleDayClick = (e) => {
        e.stopPropagation();
        setSelectedEvent(null);
        setShowModal(true);
    };

    const handleSaveEvent = (eventData) => {
        const newEvent = {
            ...eventData,
            date: date.toISOString(),
        };

        if (selectedEvent !== null) {
            updateEvent(selectedEvent, newEvent);
        } else {
            addEvent(newEvent);
        }
        setShowModal(false);
    };

    return (
        <Droppable droppableId={date.toISOString()}>
            {(provided) => (
                <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`day ${isCurrent ? 'current-day' : ''} ${isWeekend ? 'weekend' : ''}`} 
                    onClick={handleDayClick}
                >
                    <div className="day-header">
                        <span className="day-number">{date.getDate()}</span>
                    </div>
                    
                    <div className="day-content">
                        {dayEvents.map((event, index) => (
                            <Draggable 
                                key={`${event.name}-${event.startTime}`} 
                                draggableId={`${event.name}-${event.startTime}`} 
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="event-preview"
                                        style={{ 
                                            backgroundColor: EVENT_TYPES_MAP[event.type] || EVENT_TYPES_MAP['other'],
                                            color: 'white'
                                        }}
                                    >
                                        {event.name}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>

                    {showModal && (
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <div className="event-modal-content">
                                <h3>{selectedEvent !== null ? 'Edit Event' : 'Add Event'}</h3>
                                <EventForm 
                                    onSave={handleSaveEvent}
                                    existingEvent={selectedEvent !== null ? events[selectedEvent] : null}
                                />
                            </div>
                        </Modal>
                    )}
                </div>
            )}
        </Droppable>
    );
};

export default Day;