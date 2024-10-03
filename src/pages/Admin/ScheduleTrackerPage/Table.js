import React, { useEffect, useState } from 'react';
import { fetchScheduleData } from '../../../api/ScheduleTracker_api';

function Table() {
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchScheduleData();
            setScheduleData(data);
        };
        getData();
    }, []);

    return (
        <div>
            Table Rendering
            <div>
                <table className="custom-table" border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Schedule</th>
                            <th>Topic</th>
                            <th>TrainerId</th>
                            <th>Delivery Type</th>
                            <th>Training Format</th>
                            <th>Status</th>
                            <th>Scheduled Date</th>
                            <th>Actual Date</th>
                            <th>Duration</th>
                            <th>Note</th>
                            <th>Reason for mismatch - if any</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleData.map((row, rowIndex) => {
                            // Helper functions to calculate row spans
                            const getRowSpan = (delivery, key) => {
                                return delivery.map((item, index) => {
                                    let count = 1;
                                    while (index + count < delivery.length && delivery[index + count][key] === item[key]) {
                                        count++;
                                    }
                                    return index === 0 || delivery[index - 1][key] !== item[key] ? count : 0;
                                });
                            };

                            const scheduledDateRowSpan = getRowSpan(row.Delivery, 'scheduledDate');
                            const actualDateRowSpan = getRowSpan(row.Delivery, 'actualDate');
                            const durationRowSpan = getRowSpan(row.Delivery, 'duration');
                            const noteRowSpan = getRowSpan(row.Delivery, 'note');
                            const reasonForMismatchRowSpan = getRowSpan(row.Delivery, 'reasonForMismatch');

                            return row.Topic.map((topic, topicIndex) => (
                                <tr key={`${rowIndex}-${topicIndex}`}>
                                    {/* Merge Schedule and TrainerId */}
                                    {topicIndex === 0 && (
                                        <>
                                            <td rowSpan={row.Topic.length}>{row.Schedule}</td>
                                        </>
                                    )}
                                    <td>{topic}</td>
                                    {topicIndex === 0 && (
                                        <>
                                            <td rowSpan={row.Topic.length}>{row.TrainerId}</td>
                                        </>
                                    )}

                                    <td>{row.Delivery[topicIndex].name}</td>
                                    <td>{row.Delivery[topicIndex].status}</td>
                                    <td>{row.Delivery[topicIndex].report}</td>

                                    {/* Scheduled Date */}
                                    {scheduledDateRowSpan[topicIndex] > 0 && (
                                        <td rowSpan={scheduledDateRowSpan[topicIndex]}>
                                            {row.Delivery[topicIndex].scheduledDate}
                                        </td>
                                    )}

                                    {/* Actual Date */}
                                    {actualDateRowSpan[topicIndex] > 0 && (
                                        <td rowSpan={actualDateRowSpan[topicIndex]}>
                                            {row.Delivery[topicIndex].actualDate}
                                        </td>
                                    )}

                                    {/* Duration */}
                                    {durationRowSpan[topicIndex] > 0 && (
                                        <td rowSpan={durationRowSpan[topicIndex]}>
                                            {row.Delivery[topicIndex].duration}
                                        </td>
                                    )}

                                    {/* Note */}
                                    {noteRowSpan[topicIndex] > 0 && (
                                        <td rowSpan={noteRowSpan[topicIndex]}>
                                            {row.Delivery[topicIndex].note}
                                        </td>
                                    )}

                                    {/* Reason for mismatch */}
                                    {reasonForMismatchRowSpan[topicIndex] > 0 && (
                                        <td rowSpan={reasonForMismatchRowSpan[topicIndex]}>
                                            {row.Delivery[topicIndex].reasonForMismatch}
                                        </td>
                                    )}
                                </tr>
                            ));
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Table;
