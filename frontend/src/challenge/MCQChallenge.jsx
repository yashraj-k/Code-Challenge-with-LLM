import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
// 1. Import the syntax highlighter and a style theme
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export function MCQChallenge({ challenge, isReviewMode = false }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // ✅ FIX: Add a useEffect hook to reset the state when a new challenge prop is received.
    // This stops the old answer from showing on the new question.
    useEffect(() => {
        setSelectedOption(null);
        setIsAnswered(false);
    }, [challenge]); // This effect runs every time the 'challenge' object changes.

    if (!challenge) {
        return null;
    }

    const optionsArray = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)
        : challenge.options || [];

    const handleOptionSelect = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
    };

    return (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="prose max-w-none text-xl font-semibold text-slate-800">
                    {/* 2. Pass a custom component to render code blocks */}
                    <ReactMarkdown
                        components={{
                            code(props) {
                                const {children, className, node, ...rest} = props
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <SyntaxHighlighter
                                        {...rest}
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {challenge.title}
                    </ReactMarkdown>
                </div>

                <span className="capitalize text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full self-start">
                    {challenge.difficulty}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {optionsArray.map((optionText, index) => {
                    const isCorrect = isAnswered && index === challenge.correct_answer_id;
                    const isIncorrect = isAnswered && selectedOption === index && index !== challenge.correct_answer_id;

                    const buttonClasses = `
                        w-full text-left p-4 rounded-lg border-2 transition-all duration-150
                        ${isCorrect ? 'bg-green-100 border-green-500 text-green-800 font-semibold' : ''}
                        ${isIncorrect ? 'bg-red-100 border-red-500 text-red-800 font-semibold' : ''}
                        ${!isAnswered ? 'bg-slate-50 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50' : ''}
                        ${isAnswered ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                    `;

                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            disabled={isAnswered}
                            className={buttonClasses}
                        >
                            {optionText}
                        </button>
                    );
                })}
            </div>

            {(isAnswered || isReviewMode) && (
                <div className="mt-6 p-4 bg-slate-50 border-t border-slate-200 rounded-b-lg">
                    <h4 className="font-bold text-slate-700">Explanation</h4>
                    <p className="mt-2 text-slate-600">{challenge.explanation}</p>
                </div>
            )}
        </div>
    );
}

