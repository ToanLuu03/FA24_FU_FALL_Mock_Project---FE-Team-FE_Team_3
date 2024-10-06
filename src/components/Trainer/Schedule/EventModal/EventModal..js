import React from 'react';
import { Modal, DatePicker, Switch, InputNumber, Checkbox } from 'antd';
import moment from 'moment';
import './EventModal.css';

const EventModal = ({
    visible,
    event,
    mode,
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
    const isEditMode = mode === 'edit';
    return (
        <Modal title={isEditMode ? "Edit Event" : "Create Event"} open={visible} onOk={handleOk} onCancel={handleCancel}>
            <DatePicker
                showTime
                format="DD-MM-YYYY HH:mm"
                value={event?.startTime ? moment(event.startTime) : null}
                onChange={handleStartTimeChange}
                placeholder="Start time"
            />
            <span> → </span>
            <DatePicker
                showTime
                format="DD-MM-YYYY HH:mm"
                value={event?.endTime ? moment(event.endTime) : null}
                onChange={handleEndTimeChange}
                placeholder="End time"
            />
            <div className="modal-container">
                <Switch checked={recurVisible} onChange={setRecurVisible} /> Recur
            </div>

            {recurVisible && (
                <div className="recurring-container">
                    <label className="recurring-label">Recur every: </label>
                    <InputNumber
                        min={1}
                        value={recurEvery}
                        onChange={(value) => setRecurEvery(value)}
                    /> week(s)
                    <div className="checkbox-container">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                            <Checkbox
                                key={day}
                                checked={recurringDays[day]}
                                onChange={(e) => handleRecurringDaysChange(day, e.target.checked)}
                            >
                                {day}
                            </Checkbox>
                        ))}
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default EventModal;
