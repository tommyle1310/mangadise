import axios from 'axios';

// Create an instance of axios with a base URL
const axiosInstance = axios.create({
    baseURL: 'https://otruyenapi.com/v1/api/', // Replace with your API base URL
    timeout: 10000, // Timeout in milliseconds (optional)
    headers: {
        'Content-Type': 'application/json', // Adjust content type as needed
    },
});

export default axiosInstance;
