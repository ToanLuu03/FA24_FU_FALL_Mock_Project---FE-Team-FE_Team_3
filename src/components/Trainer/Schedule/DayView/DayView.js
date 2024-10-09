import React from 'react';
import './DayView.css';

const DayView = ({ timeSlots, selectedDate, isFullHour, handleCellClick, renderEvents }) => {
    return (
        <div className='daily-schedule-container'>
            <div className="daily-schedule-header-row">
                <div className="daily-schedule-header-cell">{selectedDate.format('dddd D/M')}</div>
            </div>

            <div className="daily-schedule-timetable">
                {timeSlots.map((time) => (
                    <div key={time} className="daily-schedule-time-row">
                        <div className="daily-schedule-time-cell">{isFullHour(time) ? time : null}</div>
                        <div className="event-cell daily-schedule-event-cell" onClick={() => handleCellClick(selectedDate, time)}>
                            {renderEvents(selectedDate, time)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayView;
