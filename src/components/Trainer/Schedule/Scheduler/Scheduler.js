import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, deleteEvent, fetchEvents, updateEvent } from '../../../../features/schedule/actions';
import { Button, Row, Col, Popover, notification } from 'antd';
import './Scheduler.css';
import moment from 'moment';
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import LeftCalendar from '../LeftCalendar/LeftCalendar';
import Toolbar from '../Toolbar/Toolbar';
import CreateEventModal from '../CreateEventModal/CreateEventModal';
import EditEventModal from '../EditEventModal/EditEvent';
import Timetable from '../Timetable/Timetable';
import MonthView from '../MonthView/MonthView';
import DayView from '../DayView/DayView';

const timeSlots = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
    '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
];

const Scheduler = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const events = useSelector((state) => state.events || []);

    const filteredEvents = useMemo(() => {
        if (!Array.isArray(events)) {
            return events.events || [];
        }
        return events;
    }, [events]);

    const [selectedDate, setSelectedDate] = useState(moment());
    const [viewMode, setViewMode] = useState('week');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [recurVisible, setRecurVisible] = useState(false);
    const [visiblePopover, setVisiblePopover] = useState({});
    const [newEvent, setNewEvent] = useState(null);

    const [tempStartTime, setTempStartTime] = useState(null);
    const [tempEndTime, setTempEndTime] = useState(null);

    const [isNewEventModalVisible, setIsNewEventModalVisible] = useState(false);
    const [recurEvery, setRecurEvery] = useState(1);

    const [recurringDays, setRecurringDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
    });
    const getDayIndex = (day) => {
        switch (day) {
            case 'Monday':
                return 1;
            case 'Tuesday':
                return 2;
            case 'Wednesday':
                return 3;
            case 'Thursday':
                return 4;
            case 'Friday':
                return 5;
            case 'Saturday':
                return 6;
            default:
                return null;
        }
    };


    const handleDeleteEvent = (eventId) => {
        dispatch(deleteEvent(eventId));
    };

    const handleDateSelect = (newDate) => {
        setSelectedDate(newDate);
    };

    const notifyError = (message) => {
        notification.error({
            message: 'Error',
            description: message,
            placement: 'topRight',
            duration: 3,
        });
    };
    const handleCreateNewEvent = () => {
        if (!newEvent.startTime || !newEvent.endTime) {
            notifyError("Please select both start and end times!");
            return;
        }

        const eventStartTime = moment(newEvent.startTime);
        const eventEndTime = moment(newEvent.endTime);

        if (eventStartTime.isAfter(eventEndTime)) {
            notifyError("Start time must be earlier than end time!");
            return;
        }

        const eventList = [];
        const duration = moment.duration(eventEndTime.diff(eventStartTime)).asMinutes();

        if (recurVisible) {
            for (let i = 0; i < recurEvery; i++) {
                const startOfWeek = eventStartTime.clone().startOf('week').add(i * 7, 'days');
                Object.keys(recurringDays).forEach((day) => {
                    if (recurringDays[day]) {
                        const dayIndex = getDayIndex(day);
                        const eventStart = startOfWeek.clone().day(dayIndex).set({
                            hour: eventStartTime.hour(),
                            minute: eventStartTime.minute(),
                        });
                        const eventEnd = eventStart.clone().add(duration, 'minutes');
                        eventList.push({
                            ...newEvent,
                            id: Math.random(),
                            startTime: eventStart.toISOString(),
                            endTime: eventEnd.toISOString(),
                        });
                    }
                });
            }
        } else {
            eventList.push({ ...newEvent, id: Math.random() });
        }

        eventList.forEach((event) => {
            dispatch(addEvent(event));
        });

        setRecurVisible(false);
        setRecurringDays({
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
        });
        setRecurEvery(1);
        setNewEvent(null);
        setIsNewEventModalVisible(false);
    };

    const showModal = (event) => {
        setEditingEvent(event);
        setTempStartTime(moment(event.startTime));
        setTempEndTime(moment(event.endTime));
        setRecurVisible(false);
        setRecurringDays({
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
        });
        setRecurEvery(1);
        setIsModalVisible(true);
    };

    const handleStartTimeChangeNewEvent = (value) => {
        setNewEvent({ ...newEvent, startTime: value ? value.format() : null });
    };

    const handleEndTimeChangeNewEvent = (value) => {
        setNewEvent({ ...newEvent, endTime: value ? value.format() : null });
    };

    const handleStartTimeChange = (value) => {
        if (value) {
            setTempStartTime(value);
            setEditingEvent({ ...editingEvent, startTime: value.format() });
        } else {
            setTempStartTime(null);
            setEditingEvent({ ...editingEvent, startTime: null });
        }
    };

    const handleEndTimeChange = (value) => {
        if (value) {
            setTempEndTime(value);
            setEditingEvent({ ...editingEvent, endTime: value.format() });
        } else {
            setTempEndTime(null);
            setEditingEvent({ ...editingEvent, endTime: null });
        }
    };

    const handleUpdate = () => {
        const eventStartTime = tempStartTime ? moment(tempStartTime, 'DD-MM-YYYY HH:mm') : moment(editingEvent.startTime);
        const eventEndTime = tempEndTime ? moment(tempEndTime, 'DD-MM-YYYY HH:mm') : moment(editingEvent.endTime);

        if (!eventStartTime.isValid() || !eventEndTime.isValid()) {
            notifyError("Invalid date! Please check your inputs.");
            return;
        }

        if (eventStartTime.isAfter(eventEndTime)) {
            notifyError("Start time must be earlier than end time!");
            return;
        }

        const eventList = [];
        const duration = moment.duration(eventEndTime.diff(eventStartTime)).asMinutes();

        if (recurVisible) {
            for (let i = 0; i < recurEvery; i++) {
                const startOfWeek = eventStartTime.clone().startOf('week').add(i * 7, 'days');
                Object.keys(recurringDays).forEach((day) => {
                    if (recurringDays[day]) {
                        const eventStart = startOfWeek.clone().day(getDayIndex(day)).set({
                            hour: eventStartTime.hour(),
                            minute: eventStartTime.minute(),
                        });
                        const eventEnd = eventStart.clone().add(duration, 'minutes');
                        eventList.push({
                            ...editingEvent,
                            id: Math.random(),
                            startTime: eventStart.toISOString(),
                            endTime: eventEnd.toISOString(),
                        });
                    }
                });
            }
        } else {
            eventList.push({
                ...editingEvent,
                startTime: eventStartTime.toISOString(),
                endTime: eventEndTime.toISOString(),
            });
        }

        eventList.forEach((event) => {
            dispatch(updateEvent(event));
        });

        setRecurVisible(false);
        setRecurringDays({
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
        });
        setRecurEvery(1);
        setTempStartTime(null);
        setTempEndTime(null);
        setIsModalVisible(false);
    };

    const hidePopover = (eventId) => {
        setVisiblePopover((prevState) => ({ ...prevState, [eventId]: false }));
    };

    const getWeekRange = (date) => {
        const startOfWeek = date.clone().startOf('week').add(1, 'days');
        const endOfWeek = date.clone().endOf('week');
        return `${startOfWeek.format('MMM D')} – ${endOfWeek.format('MMM D, YYYY')}`;
    };

    const getDateDisplay = () => {
        switch (viewMode) {
            case 'month':
                return selectedDate.format('MMMM YYYY');
            case 'week':
                return getWeekRange(selectedDate);
            case 'day':
                return selectedDate.format('MMMM D, YYYY');
            default:
                return '';
        }
    };

    const getFormattedWeekDays = useCallback(() => {
        const startOfWeek = selectedDate.clone().startOf('week').add(1, 'days'); // Start from Monday
        return Array.from({ length: 6 }).map((_, i) => {
            const currentDay = startOfWeek.clone().add(i, 'days');
            return { label: currentDay.format('ddd D/M'), day: currentDay };
        });
    }, [selectedDate, viewMode]);


    const handleCellClick = (day, time) => {
        const selectedTime = day.clone().set({
            hour: moment(time, 'h:mm A').hour(),
            minute: moment(time, 'h:mm A').minute(),
        });

        const eventsAtTime = filteredEvents.filter((event) =>
            moment(event.startTime).isSame(selectedTime, 'minute')
        );

        if (eventsAtTime.length === 0) {
            const newEvent = {
                id: Math.random(),
                date: selectedTime.format('YYYY-MM-DD'),
                attendeeType: 'Free Time',
                startTime: selectedTime.toISOString(),
                endTime: selectedTime.clone().add(30, 'minutes').toISOString(),
                isDeleted: false,
                topic: {
                    topicId: 0,
                    topicName: 'Free Time',
                },
                moduleId: 0,
            };

            setNewEvent(newEvent);
            setIsNewEventModalVisible(true);
        }
    };

    const renderEvents = useCallback((day, time) => {
        const selectedTime = day.clone().set({
            hour: moment(time, 'h:mm A').hour(),
            minute: moment(time, 'h:mm A').minute()
        });

        const eventsAtTime = filteredEvents.filter((event) => {
            const eventStart = moment(event.startTime);
            return eventStart.isSame(selectedTime, 'minute');
        });

        const eventWidth = eventsAtTime.length > 0 ? 100 / eventsAtTime.length : 100;

        return eventsAtTime.map((event, index) => {
            const eventStart = moment(event.startTime);
            const eventEnd = moment(event.endTime);
            const eventDuration = moment.duration(eventEnd.diff(eventStart)).asMinutes();
            const eventHeight = (eventDuration / 60) * 45;
            const eventLeft = `${index * eventWidth}%`;

            let content;
            if (event.topic && event.moduleId === 0) {
                content = (
                    <div>
                        <p><ClockCircleOutlined /> Time: {eventStart.format('h:mm A')} - {eventEnd.format('h:mm A')}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px' }}>
                            <Button type="primary" icon={<EditOutlined />} onClick={() => { hidePopover(event.id); showModal(event); }}>Edit</Button>
                            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                        </div>
                    </div>
                );
            } else {
                content = (
                    <div className='info-room'>
                        <p className='info-room-title'>{event.topic.topicName}</p>
                        <p><EnvironmentOutlined /> Location: {event.Location_name}</p>
                        <p><UserOutlined /> Admin: {event.Admin}</p>
                    </div>
                );
            }

            return (
                <Popover
                    content={content}
                    trigger="click"
                    open={visiblePopover[event.id] || false}
                    onOpenChange={(visible) => setVisiblePopover((prevState) => ({ ...prevState, [event.id]: visible }))}
                    key={event.id}
                >
                    <div
                        className={`event-item ${event.attendeeType === 'Fresher' ? 'orange'
                            : event.attendeeType === 'Intern' ? 'green'
                                : 'default'
                            }`}
                        style={{
                            height: `${eventHeight}px`,
                            left: eventLeft,
                            width: `${eventWidth}%`,
                        }}
                    >
                        <p>{eventStart.format('h:mm A')} - {eventEnd.format('h:mm A')}</p>
                        <p>{event.topic ? event.topic.topicName : 'Free time'}</p>
                    </div>
                </Popover>
            );
        });
    }, [filteredEvents, visiblePopover, handleDeleteEvent]);

    return (
        <div className='container-schedule'>
            <Row>
                <Col span={4}>
                    <LeftCalendar onDateSelect={handleDateSelect} />
                </Col>
                <Col span={20}>
                    <Toolbar
                        setSelectedDate={setSelectedDate}
                        setViewMode={setViewMode}
                        getDateDisplay={getDateDisplay}
                        viewMode={viewMode}
                    />
                    {viewMode === 'month' ? (
                        <MonthView renderEvents={renderEvents} />
                    ) : viewMode === 'day' ? (
                        <DayView
                            timeSlots={timeSlots}
                            selectedDate={selectedDate}
                            isFullHour={(time) => time.includes(':00')}
                            handleCellClick={handleCellClick}
                            renderEvents={renderEvents}
                        />
                    ) : (
                        <Timetable
                            timeSlots={timeSlots}
                            getFormattedWeekDays={getFormattedWeekDays}
                            handleCellClick={handleCellClick}
                            renderEvents={renderEvents}
                            isFullHour={(time) => time.includes(':00')}
                        />
                    )}
                </Col>
            </Row>
            {editingEvent && (
                <EditEventModal
                    visible={isModalVisible}
                    editingEvent={editingEvent}
                    recurVisible={recurVisible}
                    recurEvery={recurEvery}
                    recurringDays={recurringDays}
                    setRecurVisible={setRecurVisible}
                    setRecurEvery={setRecurEvery}
                    handleOk={handleUpdate}
                    handleCancel={() => setIsModalVisible(false)}
                    handleStartTimeChange={handleStartTimeChange}
                    handleEndTimeChange={handleEndTimeChange}
                    handleRecurringDaysChange={(day, checked) =>
                        setRecurringDays({ ...recurringDays, [day]: checked })
                    }
                />
            )}

            {newEvent && (
                <CreateEventModal
                    visible={isNewEventModalVisible}
                    newEvent={newEvent}
                    recurVisible={recurVisible}
                    recurEvery={recurEvery}
                    recurringDays={recurringDays}
                    setRecurVisible={setRecurVisible}
                    setRecurEvery={setRecurEvery}
                    handleOk={handleCreateNewEvent}
                    handleCancel={() => setIsNewEventModalVisible(false)}
                    handleStartTimeChange={handleStartTimeChangeNewEvent}
                    handleEndTimeChange={handleEndTimeChangeNewEvent}
                    handleRecurringDaysChange={(day, checked) =>
                        setRecurringDays({ ...recurringDays, [day]: checked })
                    }
                />
            )}
        </div>
    );
};

export default Scheduler;
