import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: baseURL
});

export default api;

export const getFundingHistory = async (startupName) => {

    const response = await api.get(
        `/funding-history/${encodeURIComponent(startupName)}`
    );

    return response.data;
};