// src/App.js
import React from 'react';
import { EventProvider } from './contexts/EventContext';
import Calendar from './components/Calendar/Calendar';
import SidePanel from './components/SidePanel';
import './styles/main.css';

function App() {
    return (
        <EventProvider>
            <div className="app">
                <header className="app-header">
                    <h1>Dynamic Event Calendar</h1>
                </header>
                <div className="app-content">
                    <SidePanel />
                    <Calendar />
                </div>
            </div>
        </EventProvider>
    );
}

export default App;
