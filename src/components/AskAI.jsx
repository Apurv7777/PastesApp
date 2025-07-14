import React, { useState } from "react";
import { useSelector } from "react-redux";
import { detectLinks } from "../utils/detectLinks";

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in w-full h-full flex flex-col">
      <div className="glass-card w-full h-full flex flex-col">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800 dark:text-gray-200 flex-shrink-0">
          Talk to AI
        </h3>
        
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex flex-col space-y-2 sm:space-y-3 flex-shrink-0 mb-3 sm:mb-4">
            <textarea
              className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              placeholder="Ask anything about your notes..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (question.trim() && !isLoading) {
                    askAI();
                  }
                }
              }}
              rows={2}
            />
            
            <div className="flex justify-end">
              <button
                className="px-3 sm:px-4 py-2 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-800 text-black dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                onClick={askAI}
                disabled={!question.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  '✨ Ask AI'
                )}
              </button>
            </div>
          </div>
            
          {/* Conversations */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
            <div className="space-y-2 sm:space-y-3">
              {/* Show More button if there are more than 2 conversations and not showing all */}
              {conversations.length > 2 && !showAll && (
                <div className="flex justify-center mb-3">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-md"
                  >
                    📜 Show More ({conversations.length - 2} older)
                  </button>
                </div>
              )}

              {/* Show Less button if showing all and there are more than 2 conversations */}
              {conversations.length > 2 && showAll && (
                <div className="flex justify-center mb-3">
                  <button
                    onClick={() => setShowAll(false)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-md"
                  >
                    📄 Show Less
                  </button>
                </div>
              )}

              {(showAll ? conversations : conversations.slice(0, 2)).map((conv, index) => (
                <div key={index} className="space-y-1.5 sm:space-y-2">
                  <div className="p-2.5 sm:p-3 bg-gray-200/70 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg border-l-4 border-gray-600">
                    <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-xs sm:text-sm">You:</div>
                    <div className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{conv.question}</div>
                  </div>
                  
                  <div className="p-2.5 sm:p-3 bg-green-100/70 dark:bg-green-900/30 backdrop-blur-sm rounded-lg border-l-4 border-green-500">
                    <div className="font-semibold text-green-800 dark:text-green-300 mb-1 text-xs sm:text-sm">AI:</div>
                    <div 
                      className="text-green-700 dark:text-green-200 leading-relaxed text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: conv.answer }} 
                    />
                  </div>
                </div>
              ))}
              
              {conversations.length === 0 && (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <div className="text-4xl sm:text-5xl mb-4">🤖</div>
                    <div className="text-lg sm:text-xl font-medium mb-2">Ready to help!</div>
                    <div className="text-sm sm:text-base">Ask me anything about your saved notes and pastes.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
