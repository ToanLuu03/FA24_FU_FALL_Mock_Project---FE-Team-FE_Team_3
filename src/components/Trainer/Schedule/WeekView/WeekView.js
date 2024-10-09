import React from 'react';
import './WeekView.css'
import moment from 'moment'
const WeekView = ({ timeSlots, getFormattedWeekDays, isFullHour, handleCellClick, renderEvents }) => {
    return (
        <div className='container-weekview'>
            <div className="header-row">
                <div className="header-cell"></div>
                {getFormattedWeekDays().map(({ label, day }) => (
                    <div key={label} className="header-cell" style={{ backgroundColor: `${label.slice(4, 8) === moment().format('D/M') && day.format('YYYY') === moment().format('YYYY') ? '#89A6FB' : ''}` }}>
                        {label}
                    </div>
                ))}
            </div>

            <div className="weekview">
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

export default WeekView;
