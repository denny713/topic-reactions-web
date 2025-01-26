import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_API_URL || "http://localhost:7373";

const axiosInstance = axios.create({
    baseUrl,
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
    }
});

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