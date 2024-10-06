import React from 'react';
import './Timetable.css'
const Timetable = ({ timeSlots, getFormattedWeekDays, isFullHour, handleCellClick, renderEvents }) => {
    return (
        <div className='container-timetable'>
            <div className="header-row">
                <div className="header-cell"></div>
                {getFormattedWeekDays().map(({ label }) => (
                    <div key={label} className="header-cell">
                        {label}
                    </div>
                ))}
            </div>

            <div className="timetable">
                {timeSlots.map((time) => (
                    <div key={time} className="time-row">
                        <div className="time-cell">{isFullHour(time) ? time : null}</div>
                        {getFormattedWeekDays().map(({ label, day }) => (
                            <div key={label} className="event-cell" onClick={() => handleCellClick(day, time)}>
                                {renderEvents(day, time)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timetable;
