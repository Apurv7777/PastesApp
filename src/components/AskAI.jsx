import React, { useState } from "react";
import { useSelector } from "react-redux";
import { detectLinks } from "../utils/detectLinks";

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const notes = useSelector((state) => state.paste.pastes);
  const formattedNotes = notes
    .map((note, index) => {
        const noteContent = `
          Note ${index + 1}:
          Title: ${note.title}
          Content: ${note.content}
          ID: ${note._id}
          Created At: ${note.createdAt}
        `;
        return noteContent;
    })
    .join("\n\n");

    const prompt = `
    You are an intelligent AI assistant that strictly retrieves information from the given notes and responds in a clear, natural, and human-like manner. Follow these rules:
  
    ### Context:  
    ${formattedNotes}  
  
    ### Response Guidelines:  
    - Only answer questions related to the provided notes. If a question is outside the context, simply state:  
      "I'm sorry, but I can only answer questions related to the provided notes."  
    - Do not generate information beyond the notes. Stay factual and accurate.  
    - If a title exactly matches the query, return the full content of that note.  
    - If the query contains a keyword or phrase that exists in the notes, return the most relevant note's title and content.  
    - If multiple notes are relevant, provide a concise summary while preserving key details.  
    - Do **not** include any **note ID, note index, or created at date/time** in the response.  
    - If any links, email addresses, or entities (names, locations, organizations, etc.) are detected in the notes, return them explicitly as plain text.  
    - If possible, provide the response in a **single sentence** while maintaining clarity and completeness.  
  
    ### Formatting Rules:  
    - Output **must be in plain text only**. Do not use markdown, special characters, or formatting symbols (such as *, **, #, -).  
    - Keep responses conversational, clear, and concise.  
    - Structure responses using short paragraphs if needed.  
    - Never fabricate or assume details not present in the notes.  
    - If no relevant information is found, respond with:  
      "No relevant information found in the provided notes."  
  
    Now, based on the given context, respond to the following user query in **plain text format only** without markdown:  
    Query: "${question}"  
  `;
  
  

  const askAI = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      let answer = data.candidates[0]?.content?.parts[0]?.text || "{}";

      // Process the answer to detect and convert links
      answer = detectLinks(answer);

      if (response.ok) {
        setConversations([{ question, answer }, ...conversations]);
      } else {
        setConversations([{ question, answer: "Request Failed, Please try again!" }, ...conversations]);
      }
      setQuestion("");
    } catch (error) {
      setConversations([{ question, answer: "Something went wrong! Please try again!" }, ...conversations]);
      setQuestion("");
    }
  };

  return (
    <div className="flex flex-col items-center mt-auto p-6 w-[60vw] min-h-[79vh] w-full">
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-1 text-center">
      🎙️ Speak to Notes
      </h3>
      <div className="w-full min-w-[60vw] max-w-[40vw] rounded-xl p-4 space-y-6">
        <div className="flex flex-col space-y-4">
          <textarea
            className="p-3 border-2 border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full resize-none overflow-auto"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={1}
          />
          <div className="flex justify-end">
            <button
              className="w-[18vh] bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              onClick={askAI}
            >
              Ask AI
            </button>
          </div>
          <div className="space-y-2 max-h-[36vh] overflow-y-auto custom-scrollbar">
            {conversations.map((conv, index) => (
              <div key={index} className="space-y-1">
                <div className="p-3 overflow-auto bg-blue-50 rounded-lg text-blue-700 custom-scrollbar min-w-50">
                  <strong>You :</strong> {conv.question}
                </div>
                <div className="p-3 overflow-auto bg-green-50 rounded-lg text-green-700 custom-scrollbar min-w-45">
                  <strong>AI :</strong>{" "}
                  <span dangerouslySetInnerHTML={{ __html: conv.answer }} />
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
