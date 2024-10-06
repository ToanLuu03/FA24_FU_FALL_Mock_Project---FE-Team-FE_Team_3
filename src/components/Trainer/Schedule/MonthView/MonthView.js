import React from 'react';
import { Calendar, Badge } from 'antd';
import './MonthView.css';

const MonthView = ({ renderEvents }) => {
    const getListData = (value) => {
        const eventsForDay = renderEvents(value);
        return eventsForDay.map((event) => ({
            type: 'success',
            content: event.title,
        }));
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="calendar-container">
            <Calendar
                dateCellRender={dateCellRender}
                headerRender={() => null} // Add custom header
            />
        </div>
    );
};

export default MonthView;
