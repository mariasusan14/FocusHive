import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
const CalendarComponent = ({ onDateChange }) => {
  return (
    <div className='calendar'>
      <Calendar onChange={onDateChange} />
    </div>
  );
};

export default CalendarComponent;