import axios from 'axios';

// URL API
const URLTrainer = 'https://66fcc28bc3a184a84d17e2ab.mockapi.io/api/scheduletracker/scheduletracker';
// const URLTrainer = 'https://66fb718e8583ac93b40bc54d.mockapi.io/api/v1/admin/schedule-tracker/TRAINER';
// Hàm lấy dữ liệu từ API
export const fetchScheduleData = async () => {
    try {
        const { data } = await axios.get(URLTrainer);

        if (data && data[0]?.data) {
            return data[0].data.flatMap(extractContents);
        }
        return []; // Return an empty array if no data
    } catch (error) {
        console.error("Error fetching schedule data:", error.response ? error.response.data : error.message);
        return []; // Return an empty array on error
    }
};

// Helper function for extracting content
const extractContents = (trainer) => {
    return trainer.classes.flatMap(classItem =>
        classItem.modules.flatMap(moduleItem =>
            moduleItem.contents.map(content => ({
                className: classItem.className,
                classId: classItem.classId,
                Schedule: content.topicName,
                moduleName: moduleItem.moduleName,
                TrainerId: trainer.trainerId,
                contentDeliveryType: content.contentDeliveryType,
                contentName: content.contentName,
                contentTrainingFormat: content.contentTrainingFormat,
                contentPlannedDate: content.contentPlannedDate,
                reportActualDate: content.reportActualDate,
                reportDuration: content.reportDuration,
                reportNote: content.reportNote,
                reportReason: content.reportReason,
            }))
        )
    );
};
