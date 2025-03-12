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
    You are an advanced AI assistant designed to retrieve and summarize information strictly from the provided notes. You must adhere to the following rules:  

    ### Context:  
    ${formattedNotes}  

    ### Response Guidelines:  
    - Your response **must only use information available in the notes**. Do not generate any information beyond the given context.  
    - If a query exactly matches a **note title**, return the full content of that note.  
    - If a query contains a **keyword, phrase, or ID** that exists in the notes, return the **most relevant note** along with its **title and content**.  
    - If multiple notes contain relevant information, summarize them while maintaining accuracy.  
    - If the query asks for a **specific date, event, or location**, ensure the response includes the **title, date, and any relevant details** from the notes.  
    - If the question **does not match any available information**, respond with:  
      *"No relevant information found in the provided notes."*  

    ### Formatting:  
    - Provide concise and clear responses.  
    - If applicable, return structured information using bullet points or short paragraphs.  
    - Do not fabricate or assume any details not explicitly mentioned in the notes.  

    **Now, based on the given context, respond to the following user query:**  
    **Query:** "${question}"  
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
    <div className="flex flex-col items-center mt-auto justify-center p-6 w-[60vw] min-h-[60vh] w-full">
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 mt-6 text-center">
      🎙️ Speak to Notes
      </h3>
      <div className="w-full min-w-[60vw] max-w-[40vw] rounded-xl p-4 space-y-6">
        <div className="flex flex-col space-y-4">
          <textarea
            className="p-3 border-2 mb-2 border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full resize-none overflow-auto"
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
          <div className="space-y-2 max-h-[30vh] overflow-y-auto custom-scrollbar">
            {conversations.map((conv, index) => (
              <div key={index} className="space-y-2">
                <div className="p-3 overflow-auto bg-blue-50 rounded-lg text-blue-700 custom-scrollbar min-w-50">
                  <strong>You:</strong> {conv.question}
                </div>
                <div className="p-3 overflow-auto bg-green-50 rounded-lg text-green-700 custom-scrollbar min-w-45">
                  <strong>AI:</strong>{" "}
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
