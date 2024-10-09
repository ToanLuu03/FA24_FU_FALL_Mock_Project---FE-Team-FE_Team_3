import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, deleteEvent, fetchEvents, updateEvent } from '../../../features/schedule/actions';
import { Button, Row, Col, Popover, notification } from 'antd';
import './SchedulePage.css';
import moment from 'moment';
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import LeftCalendar from '../../../components/Trainer/Schedule/LeftCalendar/LeftCalendar';
import Toolbar from '../../../components/Trainer/Schedule/Toolbar/Toolbar';
import EventModal from '../../../components/Trainer/Schedule/EventModal/EventModal';
import WeekView from '../../../components/Trainer/Schedule/WeekView/WeekView';
import MonthView from '../../../components/Trainer/Schedule/MonthView/MonthView';
import DayView from '../../../components/Trainer/Schedule/DayView/DayView';

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

const Schedule = () => {
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

  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));
  const [viewMode, setViewMode] = useState('week');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [recurVisible, setRecurVisible] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState({});
  const [newEvent, setNewEvent] = useState(null);
  const [isNewEventModalVisible, setIsNewEventModalVisible] = useState(false);
  const [recurEvery, setRecurEvery] = useState(1);
  const isEditMode = editingEvent !== null;
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

  const handleDeleteEvent = useCallback(
    (eventId) => {
      dispatch(deleteEvent(eventId));
    },
    [dispatch]
  );


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

  const generateNextId = useCallback(() => {
    const existingIds = filteredEvents.map((event) => event.id);
    const highestId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    return highestId + 1;
  }, [filteredEvents]);

  const handleStartTimeChangeNewEvent = (value) => {
    setNewEvent({ ...newEvent, startTime: value ? value.format() : null });
  };

  const handleEndTimeChangeNewEvent = (value) => {
    setNewEvent({ ...newEvent, endTime: value ? value.format() : null });
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
    const nextId = generateNextId();

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
              id: nextId + eventList.length,
              startTime: eventStart.toISOString(),
              endTime: eventEnd.toISOString(),
            });
          }
        });
      }
    } else {
      eventList.push({ ...newEvent, id: nextId });
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

  const handleStartTimeChange = (value) => {
    if (value) {
      setEditingEvent({ ...editingEvent, startTime: value.format() });
    } else {
      setEditingEvent({ ...editingEvent, startTime: null });
    }
  };

  const handleEndTimeChange = (value) => {
    if (value) {
      setEditingEvent({ ...editingEvent, endTime: value.format() });
    } else {
      setEditingEvent({ ...editingEvent, endTime: null });
    }
  };

  const handleEdit = () => {
    const eventStartTime = moment(editingEvent.startTime);
    const eventEndTime = moment(editingEvent.endTime);

    if (!eventStartTime.isValid() || !eventEndTime.isValid()) {
      notifyError("Please select both start and end times!");
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
    setIsModalVisible(false);
    setEditingEvent(null);
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
    const startOfWeek = selectedDate.clone().startOf('week').add(1, 'day');
    return Array.from({ length: 6 }).map((_, i) => {
      const currentDay = startOfWeek.clone().add(i, 'days');
      return { label: currentDay.format('ddd D/M'), day: currentDay };
    });
  }, [selectedDate]);

  const handleCellClick = (day, time) => {
    const selectedTime = day.clone().set({
      hour: moment(time, 'h:mm A').hour(),
      minute: moment(time, 'h:mm A').minute(),
    });

    const isPast = selectedTime.isBefore(moment(), 'minute');

    const eventsAtTime = filteredEvents.filter((event) =>
      moment(event.startTime).isSame(selectedTime, 'minute')
    );

    if (isPast && eventsAtTime.length === 0) {
      notification.warning({
        message: 'Invalid Time',
        description: 'You cannot create an event in the past.',
        placement: 'topRight',
        duration: 3,
      });
      return;
    }

    if (eventsAtTime.length === 0) {
      const newEvent = {
        id: Math.random(),
        date: selectedTime.format('YYYY-MM-DD'),
        attendeeType: 'Free Time',
        startTime: selectedTime.toISOString(),
        endTime: selectedTime.clone().add(1, 'hours').toISOString(),
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

    const timeMoment = moment(time, 'h:mm A');
    const selectedTime = moment(day)
      .set({
        hour: timeMoment.hour(),
        minute: timeMoment.minute(),
      });
    const eventsAtTime = filteredEvents.filter((event) => {
      const eventDate = moment(event.date);
      const selectDate = moment(selectedTime);

      if (eventDate.isSame(selectDate, 'day')) {
        const eventStart = moment(event.startTime);
        const startWindow = moment(selectedTime).subtract(5, 'minutes');
        const endWindow = moment(selectedTime).add(5, 'minutes');

        return eventStart.isBetween(startWindow, endWindow, 'minutes', '[]');
      }
      return false;
    });


    const eventWidth = eventsAtTime.length > 0 ? 100 / eventsAtTime.length : 100;

    return eventsAtTime.map((event, index) => {
      const eventStart = moment(event.startTime);
      const eventEnd = moment(event.endTime);
      const eventDuration = moment.duration(eventEnd.diff(eventStart)).asMinutes();
      const eventHeight = (eventDuration / 30) * 21;
      const eventLeft = `${index * eventWidth}%`;

      let content;
      if (event.topic && event.moduleId === 0) {
        content = (
          <div>
            <p className='info-room-title'>{event.topic.topicName}</p>
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
            <WeekView
              timeSlots={timeSlots}
              getFormattedWeekDays={getFormattedWeekDays}
              handleCellClick={handleCellClick}
              renderEvents={renderEvents}
              isFullHour={(time) => time.includes(':00')}
            />
          )}
        </Col>
      </Row>
      {(isEditMode ? editingEvent : newEvent) && (
        <EventModal
          visible={isEditMode ? isModalVisible : isNewEventModalVisible}
          event={isEditMode ? editingEvent : newEvent}
          isEditMode={isEditMode}
          recurVisible={recurVisible}
          recurEvery={recurEvery}
          recurringDays={recurringDays}
          setRecurVisible={setRecurVisible}
          setRecurEvery={setRecurEvery}
          handleOk={isEditMode ? handleEdit : handleCreateNewEvent}
          handleCancel={() => isEditMode ? setIsModalVisible(false) : setIsNewEventModalVisible(false)}
          handleStartTimeChange={isEditMode ? handleStartTimeChange : handleStartTimeChangeNewEvent}
          handleEndTimeChange={isEditMode ? handleEndTimeChange : handleEndTimeChangeNewEvent}
          handleRecurringDaysChange={(day, checked) =>
            setRecurringDays({ ...recurringDays, [day]: checked })
          }
        />
      )}

    </div>
  );
};

export default Schedule;
