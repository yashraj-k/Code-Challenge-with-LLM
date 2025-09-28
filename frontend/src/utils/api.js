import { useAuth } from "@clerk/clerk-react";

// NEW LINE 1: This is the key. It reads the variable from Vercel's environment.
// If it can't find it (like when you run locally), it uses 'http://localhost:8000' as a backup.
const API_BASE_URL = 'http://localhost:8000';

export const useApi = () => {
    const { getToken } = useAuth();

    const makeRequest = async (endpoint, options = {}) => {
        // You can add this line to see which URL is being used in the browser console. Very helpful for debugging!
        console.log("API request is being sent to:", `${API_BASE_URL}/api/${endpoint}`);

        const token = await getToken();
        const defaultOptions = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        // NEW LINE 2: The fetch call now uses the API_BASE_URL variable.
        const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
            ...defaultOptions,
            ...options
        });

        if (!response.ok) {
            const errordata = await response.json().catch(() => null);
            if (response.status === 429) {
                throw new Error("Daily quota exceeded");
            }
            throw new Error(errordata?.detail || "An error occurred");
        }

        return response.json();
    };
    return { makeRequest };
};