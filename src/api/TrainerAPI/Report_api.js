import axios from 'axios';

export const fetchClasses = async () => {
    try {
        const response = await axios.get('https://fams-eqdedeekc2grgxa2.australiaeast-01.azurewebsites.net/api/v1/trainers/trainer-report/get-schedule-non-report');
        return response; 
    } catch (error) {
        console.error('Error fetching classes:', error); 
        throw new Error('Failed to fetch classes'); 
    }
};
