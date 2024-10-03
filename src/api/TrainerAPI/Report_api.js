const API_BASE_URL = 'https://66fe3c842b9aac9c997aecd6.mockapi.io/api/';


export const fetchSourceTrain = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/dataSourceTrain`); // Thay bằng API thật
        const data = await response.json();
        console.log(data); // Kiểm tra dữ liệu trả về từ API
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // Ném lỗi nếu cần xử lý ở component
    }
};

