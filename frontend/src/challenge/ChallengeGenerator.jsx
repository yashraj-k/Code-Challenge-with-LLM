import React, { useState, useEffect } from "react";
import { MCQChallenge } from "./MCQChallenge.jsx";
import {useApi} from "../utils/api.js";

export function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    const [quota, setQuota] = useState(null);
    const {makeRequest} = useApi()

    useEffect(()=>{
        fetchQuota()
    },[])

    const fetchQuota = async () => {
        try{
            const data = await makeRequest("quota")
            setQuota(data)
        } catch(err){
            console.log(err)
        }
    };
    const generateChallenge = async () => {
        setIsLoading(true)
        setError(null)

        try{
            const  data = await makeRequest("generate-challenge",{
                method :"POST",
                body : JSON.stringify({difficulty})
            })
            setChallenge(data)
            fetchQuota()
        }catch (e){
            setError(e.message || "Failed to generate challenge.")
        }finally {
            setIsLoading(false)
        }
    };
    const getNextResetTime = () => {
        if(!quota?.last_reset_date) return null
        const resetDate = new Date(quota.last_reset_date)
        resetDate.setHours(resetDate.getHours()+24)
        return resetDate
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Coding Challenge Generator
            </h2>
            <p className="text-slate-500 mb-6">Select a difficulty and generate a new challenge.</p>

            {/* Quota Display */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-sm">
                <div className="flex justify-between items-center">
                    <p className="text-slate-600">Challenges remaining today:</p>
                    <p className="font-bold text-slate-800 text-base">
                        {quota?.quota_remaining || 0}
                    </p>
                </div>
                {quota?.quota_remaining === 0 && (
                    <div className="flex justify-between items-center mt-2 text-amber-600">
                        <p>Next Reset:</p>
                        <p className="font-semibold">{getNextResetTime()?.toLocaleString() || "..."}</p>
                    </div>
                )}
            </div>

            {/* Difficulty Selector */}
            <div className="mb-6">
                <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 mb-2">
                    Difficulty
                </label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    disabled={isLoading}
                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out py-3 px-4 disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            {/* Generate Button */}
            <button
                onClick={generateChallenge}
                disabled={false}
                className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 py-3 px-6 text-base font-semibold text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
                {isLoading ? "Generating..." : "Generate Challenge"}
            </button>

            {/* Error Message Display */}
            {error && (
                <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {/* Generated Challenge Display */}
            {challenge && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                    <MCQChallenge challenge={challenge} />
                </div>
            )}
        </div>
    );
}