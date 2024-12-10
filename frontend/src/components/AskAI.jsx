import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AskAI = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const notes = useSelector((state) => state.paste.pastes);

    const askAI = async () => {
        const retryFetch = async (url, options, retries = 5, delay = 5000) => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.error && errorData.error.includes('currently loading') && retries > 0) {
                        await new Promise((resolve) => setTimeout(resolve, delay));
                        return retryFetch(url, options, retries - 1, delay);
                    }
                    throw new Error('Failed to get a response from the server');
                }
                return response.json();
            } catch (error) {
                if (retries === 0) throw error;
                await new Promise((resolve) => setTimeout(resolve, delay));
                return retryFetch(url, options, retries - 1, delay);
            }
        };
    
        try {
            const data = await retryFetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notes, question }),
            });
            setAnswer(data.answer);
        } catch (error) {
            console.error(error);
            setAnswer('Failed to get an answer from AI');
        }
    };

    return (
        <div className="flex flex-col items-center mt-auto justify-center w-full p-6 max-h-screen">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 text-center">Ask AI about your Notes</h3>
            <div className="w-full max-w-lg rounded-xl shadow-lg p-4 space-y-6">
                <div className="flex flex-col space-y-4">
                    <textarea
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
                        placeholder="Enter your question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={4}
                    />
                    <button
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        onClick={askAI}
                    >
                        Ask AI
                    </button>
                    <div className="space-y-4">
                        {question && (
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-700">
                                <strong>You:</strong> {question}
                            </div>
                        )}
                        {answer && (
                            <div className="p-3 bg-green-50 rounded-lg text-green-700">
                                <strong>AI:</strong> {answer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskAI;
