import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import { fetchTrainings } from '../trainingsapi';

function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchTrainings()
            .then((data) => {
                const formattedEvents = data.map((training) => ({
                    title: `${training.activity} (${training.customer?.firstname || ''} ${training.customer?.lastname || ''})`,
                    start: dayjs(training.date).toISOString(),
                    end: dayjs(training.date).add(training.duration, 'minutes').toISOString(),
                }));
                setEvents(formattedEvents);
            })
            .catch((err) => console.error('Error fetching trainings:', err));
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={events}
                editable={false}
                selectable={false}
                height="100%"
            />
        </div>
    );
}

export default CalendarPage;
