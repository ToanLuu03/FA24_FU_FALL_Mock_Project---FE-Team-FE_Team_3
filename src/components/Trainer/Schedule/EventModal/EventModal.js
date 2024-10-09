import React from 'react';
import { Modal, DatePicker, Switch, InputNumber, Checkbox, Button } from 'antd';
import dayjs from 'dayjs';
import './EventModal.css';

const EventModal = ({
    visible,
    event,
    isEditMode,
    recurVisible,
    recurEvery,
    recurringDays,
    setRecurVisible,
    setRecurEvery,
    handleOk,
    handleCancel,
    handleStartTimeChange,
    handleEndTimeChange,
    handleRecurringDaysChange,
}) => {
    const disablePastDates = (current) => {
        return current && current < dayjs().startOf('day');
    };

    const disablePastTimes = (selectedDate) => {
        if (!selectedDate || selectedDate.isAfter(dayjs(), 'day')) {
            return {};
        }
        const currentHour = dayjs().hour();
        const currentMinute = dayjs().minute();
        return {
            disabledHours: () => Array.from({ length: 24 }, (_, hour) => hour).filter(hour => hour < currentHour),
            disabledMinutes: (selectedHour) =>
                selectedHour === currentHour ? Array.from({ length: 60 }, (_, minute) => minute).filter(minute => minute < currentMinute) : [],
        };
    };

    const disableCheckbox = (day) => {
        const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
        const todayIndex = dayjs().day();
        return dayIndex < todayIndex;
    };

    return (
        <Modal
            title={isEditMode ? "FREE TIME REGISTRATION" : "Create Event"}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <div className="date-time-picker-container">
                <DatePicker
                    showTime
                    format="DD-MM-YYYY HH:mm"
                    value={event?.startTime ? dayjs(event.startTime) : null}
                    onChange={handleStartTimeChange}
                    placeholder="Start time"
                    disabledDate={disablePastDates}
                    disabledTime={(current) => disablePastTimes(current)}
                />
                <span className="arrow-separator">→</span>
                <DatePicker
                    showTime
                    format="DD-MM-YYYY HH:mm"
                    value={event?.endTime ? dayjs(event.endTime) : null}
                    onChange={handleEndTimeChange}
                    placeholder="End time"
                    disabledDate={disablePastDates}
                    disabledTime={(current) => disablePastTimes(current)}
                />

                <div className="recur-container">
                    <Switch checked={recurVisible} onChange={setRecurVisible} /> Repeat
                </div>
            </div>



            {recurVisible && (
                <div className="recurring-container">
                    <label className="recurring-label">Recur every</label>
                    <InputNumber
                        min={1}
                        value={recurEvery}
                        onChange={(value) => setRecurEvery(value)}
                    />
                    <span>Week(s) on:</span>
                    <div className="checkbox-container">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                            <Checkbox
                                key={day}
                                checked={recurringDays[day]}
                                onChange={(e) => handleRecurringDaysChange(day, e.target.checked)}
                                disabled={disableCheckbox(day)} // Disable checkboxes for past days
                            >
                                {day}
                            </Checkbox>
                        ))}
                    </div>
                </div>
            )}

            <div className="modal-footer">
                <Button danger onClick={handleCancel}>Cancel</Button>
                <Button type="primary" onClick={handleOk}>
                    {isEditMode ? "Save" : "Create"}
                </Button>
            </div>
        </Modal>
    );
};

export default EventModal;
