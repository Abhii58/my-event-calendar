// src/components/Event/EventItem.js
import React, { useContext, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import Modal from '../UI/Modal'; // Assuming you have a Modal component
import EventForm from './EventForm'; // Assuming you have an EventForm component

const EventItem = ({ event, index }) => {
    const { updateEvent, deleteEvent } = useContext(EventContext);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = () => {
        setShowModal(true); // Open the modal to edit the event
    };

    const handleDelete = () => {
        deleteEvent(index); // Delete the event
    };

    const handleSaveEvent = (updatedEvent) => {
        console.log('Updated Event:', updatedEvent); // Debugging line
        updateEvent(index, updatedEvent); // Update the event in context
        setShowModal(false); // Close the modal
    };

    return (
        <div className="event-item">
            <h4>{event.name}</h4>
            <p>{event.startTime} - {event.endTime}</p>
            <p>{event.description}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>

            {/* Modal for editing the event */}
            {showModal && (
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <EventForm 
                        onSave={handleSaveEvent} 
                        existingEvent={event} // Pass the existing event data
                    />
                </Modal>
            )}
        </div>
    );
};

export default EventItem;