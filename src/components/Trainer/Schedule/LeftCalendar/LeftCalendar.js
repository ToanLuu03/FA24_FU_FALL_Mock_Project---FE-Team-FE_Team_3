import React from 'react';
import { Calendar } from 'antd';
import { Space, Select } from 'antd';
import './LeftCalendar.css'
const { Option } = Select;

const LeftCalendar = ({ onDateSelect }) => {
    const headerRender = ({ value, onChange }) => {
        const year = value.year();
        const monthOptions = [];
        const currentMonth = value.month();
        const localeData = value.localeData();

        for (let i = 0; i < 12; i++) {
            monthOptions.push(
                <Option key={i} value={i} className="month-item">
                    {localeData.monthsShort(value.clone().month(i))}
                </Option>
            );
        }

        const yearOptions = [];
        for (let i = year - 10; i < year + 10; i += 1) {
            yearOptions.push(
                <Option key={i} value={i} className="year-item">
                    {i}
                </Option>
            );
        }

        return (
            <Space className='header-calendar-left'>
                <Select
                    value={year}
                    onChange={(newYear) => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                    }}
                >
                    {yearOptions}
                </Select>
                <Select
                    value={currentMonth}
                    onChange={(newMonth) => {
                        const now = value.clone().month(newMonth);
                        onChange(now);
                    }}
                >
                    {monthOptions}
                </Select>
            </Space>
        );
    };

    return (
        <div className='calendar-left'>
            <Calendar
                fullscreen={false}
                headerRender={headerRender}
                onSelect={(date) => onDateSelect(date)}
            />
            <div className="calendar-legend">
                <p><span className="legend-color" style={{ backgroundColor: 'orange' }}></span> Fresher</p>
                <p><span className="legend-color" style={{ backgroundColor: 'green' }}></span> Intern</p>
                <p><span className="legend-color" style={{ backgroundColor: 'lightblue' }}></span> Free time</p>
            </div>
        </div>
    );
};

export default LeftCalendar;
