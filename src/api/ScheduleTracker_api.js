import axios from 'axios';

const URLTrainer = 'https://fams-eqdedeekc2grgxa2.australiaeast-01.azurewebsites.net/api/v1/admin/schedule-tracker?option=TRAINER';
const token = localStorage.getItem('token');

// Fetch Data from the API
export const fetchDataTrainer = async () => {
    try {
        const response = await axios.get(URLTrainer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        // Ensure the response data is correct
        if (response?.data?.data) {
            const extractedData = extractContents(response.data);
            console.log('Extracted Data:', extractedData);
            return extractedData;
        } else {
            console.log('No data found in response:', response);
            return [];
        }

    } catch (error) {
        console.error('Error fetching trainer data:', error.response?.data || error.message, error);
    }

};

const extractContents = (trainerData) => {
    return trainerData?.data?.flatMap(trainer => {
        return trainer?.classes?.flatMap(classItem => {
            return classItem?.modules?.flatMap(moduleItem => {
                return moduleItem?.contents?.map(content => ({
                    trainerId: trainer?.trainerId || null,  // default null if value is not available
                    className: classItem?.className || null,
                    classId: classItem?.classId || null,
                    moduleName: moduleItem?.moduleName || null,
                    moduleId: moduleItem?.moduleId || null,
                    startDate: moduleItem?.startDate || null,
                    endDate: moduleItem?.endDate || null,
                    topicName: content?.topicName || null,
                    contentName: content?.contentName || null,
                    contentDeliveryType: content?.contentDeliveryType || null,
                    contentTrainingFormat: content?.contentTrainingFormat || null,
                    contentPlannedDate: content?.contentPlannedDate || null,
                    reportActualDate: content?.reportActualDate || null,
                    reportDuration: content?.reportDuration || null,
                    reportNote: content?.reportNote || null,
                    reportReason: content?.reportReason || null
                }));
            }) || [];  // Default to an empty array if 'modules' or 'contents' is empty
        }) || [];  // Default to an empty array if 'classes' is empty
    }) || [];  // Default to an empty array if 'data' is empty
};

// Example usage:
fetchDataTrainer().then(trainerData => {
    const extractedContent = extractContents(trainerData);
    console.log(extractedContent);
});
