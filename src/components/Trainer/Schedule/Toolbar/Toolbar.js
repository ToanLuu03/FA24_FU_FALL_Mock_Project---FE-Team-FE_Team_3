import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import './Toolbar.css';

const Toolbar = ({ setSelectedDate, setViewMode, getDateDisplay, viewMode }) => {
    return (
        <div className="toolbar-container">
            <div className="today-button">
                <Button type="primary" onClick={() => setSelectedDate(moment())}>Today</Button>
            </div>
            <div className="date-display">{getDateDisplay()}</div>
            <div className="toolbar-buttons">
                <Button
                    type={viewMode === 'month' ? 'primary' : 'default'}
                    onClick={() => setViewMode('month')}
                >
                    Month
                </Button>
                <Button
                    type={viewMode === 'week' ? 'primary' : 'default'}
                    onClick={() => setViewMode('week')}
                >
                    Week
                </Button>
                <Button
                    type={viewMode === 'day' ? 'primary' : 'default'}
                    onClick={() => setViewMode('day')}
                >
                    Day
                </Button>
            </div>
        </div>
    );
};

export default Toolbar;
