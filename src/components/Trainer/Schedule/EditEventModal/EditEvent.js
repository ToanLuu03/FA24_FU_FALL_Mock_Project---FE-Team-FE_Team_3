import React from 'react';
import { Modal, DatePicker, Switch, InputNumber, Checkbox, Button } from 'antd';
import moment from 'moment';
import './EditEventModal.css';

const EditEventModal = ({
    visible,
    editingEvent,
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
    return (
        <Modal title="Edit Event" open={visible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <div className="date-time-picker-container">
                <DatePicker
                    showTime
                    format="DD-MM-YYYY HH:mm"
                    value={editingEvent?.startTime ? moment(editingEvent.startTime) : null}
                    onChange={handleStartTimeChange}
                    placeholder="Start time"
                />
                <span className="arrow-separator">→</span>
                <DatePicker
                    showTime
                    format="DD-MM-YYYY HH:mm"
                    value={editingEvent?.endTime ? moment(editingEvent.endTime) : null}
                    onChange={handleEndTimeChange}
                    placeholder="End time"
                />
            </div>

            <div className="recur-container">
                <Switch checked={recurVisible} onChange={setRecurVisible} /> Recur
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
                            >
                                {day}
                            </Checkbox>
                        ))}
                    </div>
                </div>
            )}

            <div className="modal-footer">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" onClick={handleOk}>
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default EditEventModal;
