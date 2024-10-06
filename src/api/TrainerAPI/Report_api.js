import axios from 'axios';

export const fetchClasses = async () => {
    try {
        const response = await axios.get('https://testapi.io/api/locpt/api/v1/trainers/trainer-report/get-schedule-non-report');
        return response; // Trả về response nếu thành công
    } catch (error) {   
        console.error('Error fetching classes:', error); // Log lỗi vào console
        throw new Error('Failed to fetch classes'); // Ném ra lỗi để thông báo cho phần gọi hàm biết
    }
};
