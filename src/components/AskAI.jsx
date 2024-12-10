import React, { useState } from "react";
import { useSelector } from "react-redux";

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const notes = useSelector((state) => state.paste.pastes);
  const formattedNotes = notes
    .map(
      (note, index) =>
        `Note ${index + 1}:\n${
          typeof note === "object" ? JSON.stringify(note, null, 2) : note
        }`
    )
    .join("\n\n");

  const prompt = `
  You are an AI assistant. Use the provided context to answer the user's question accurately and concisely. Do not make up information beyond the context.
  
  Context:
  ${formattedNotes}
  
  `;
  
  const askAI = async () => {
    try {
      const url =
        "https://api-inference.huggingface.co/models/distilbert-base-cased-distilled-squad";
      const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      const body = JSON.stringify({
        inputs: {
          question: question,
          context: prompt,
        },
      });
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': "application/json",
        },
        body: body,
      });

      const data = await response.json();
      setConversations([{ question, answer: data.answer }, ...conversations]);
      setQuestion("");
    } catch (error) {
      setConversations([{ question, answer: "Something went wrong! Please try again!" }, ...conversations]);
      setQuestion("");
    }
  };

  return (
    <div className="flex flex-col items-center mt-auto justify-center p-6 max-h-screen w-full">
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 mt-6 text-center">
        Ask AI about your Notes
      </h3>
      <div className="w-full min-w-[60vw] max-w-[40vw] rounded-xl p-4 space-y-6">
        <div className="flex flex-col space-y-4">
          <textarea
            className="p-3 border-2 mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full resize-none overflow-auto"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={1}
          />
          <button
            className="w-full mb-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            onClick={askAI}
          >
            Ask AI
          </button>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {conversations.map((conv, index) => (
              <div key={index} className="space-y-2">
                <div className="p-3 overflow-auto bg-blue-50 rounded-lg text-blue-700 custom-scrollbar min-w-50">
                  <strong>You:</strong> {conv.question}
                </div>
                <div className="p-3 overflow-auto bg-green-50 rounded-lg text-green-700 custom-scrollbar min-w-45">
                  <strong>AI:</strong> {conv.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
