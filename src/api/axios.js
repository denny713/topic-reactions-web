import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_API_URL || "http://localhost:7373";

const axiosInstance = axios.create({
    baseUrl,
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const isAuthPage = config.url.includes('/login') || config.url.includes('/register');
        if (!isAuthPage) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const get = (url, params = {}) => {
    return axiosInstance
        .get(url, { params })
        .then((response) => response.data)
        .catch((error) => {
            throw error.response ? error.response.data : error;
        });
};

export const post = (url, data) => {
    return axiosInstance
        .post(url, data)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response ? error.response.data : error;
        });
};

export default axiosInstance;