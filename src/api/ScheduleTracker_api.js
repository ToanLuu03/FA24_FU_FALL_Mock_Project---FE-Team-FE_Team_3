import axios from 'axios';

const URL = 'https://66fcc28bc3a184a84d17e2ab.mockapi.io/api/scheduletracker/scheduletracker';

export const fetchScheduleData = async () => {
    try {
        const res = await axios.get(URL);
        if (res && res.data) {
            const result = res.data.map((raw) => ({
                Schedule: raw.Schedule,
                Topic: raw.Topic,
                TrainerId: raw.TrainerId,
                Delivery: raw.Delivery.map((delivery) => ({
                    name: delivery.name,
                    status: delivery.status,
                    report: delivery.report,
                    scheduledDate: delivery.scheduledDate,
                    actualDate: delivery.actualDate,
                    duration: delivery.duration,
                    note: delivery.note,
                    reasonForMismatch: delivery.reasonForMismatch,
                })),
            }));
            return result;
        }
    } catch (error) {
        console.error("Error fetching schedule data:", error);
        return [];
    }
};


