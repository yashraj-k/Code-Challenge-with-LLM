import React, { useState, useEffect } from "react";
import { MCQChallenge } from "../challenge/MCQChallenge.jsx";
import {useApi} from "../utils/api.js"; // Note: Assumes MCQChallenge is also styled

// Optional: A spinner for the loading state
const Spinner = () => (
    <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export function HistoryPanel() {
    const {makeRequest} = useApi()
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    // Placeholder fetch function with corrected logic
    const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await makeRequest("my-history")
            setHistory(data.challenges)


        } catch (e) {
            setError("Failed to load history");
        } finally {
            setIsLoading(false);
        }
    };

    // Loading State UI
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 shadow-lg">
                <Spinner />
                <p className="mt-4 text-lg font-medium text-slate-600">Loading History...</p>
            </div>
        );
    }

    // Error State UI
    if (error) {
        return (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-8 shadow-lg text-center">
                <h3 className="text-xl font-bold text-red-800">Something went wrong</h3>
                <p className="mt-2 text-red-700">We couldn't load your challenge history.</p>
                <button
                    onClick={fetchHistory}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 py-2 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Main Content UI
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Challenge History
            </h2>
            {history.length === 0 ? (
                // Empty State UI
                <div className="text-center py-12">
                    <p className="text-slate-500">You have not completed any challenges yet.</p>
                </div>
            ) : (
                // History List UI
                <div className="grid grid-cols-1 gap-6">
                    {history.map((challenge) => (
                        <MCQChallenge
                            challenge={challenge}
                            key={challenge.id}
                            isReviewMode={true} // Using a more descriptive prop
                        />
                    ))}
                </div>
            )}
        </div>
    );
}