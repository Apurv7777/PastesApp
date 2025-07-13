import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../assets/search-icon.png";
import editIcon from "../assets/edit-icon.png";
import viewIcon from "../assets/view-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import copyIcon from "../assets/copy-icon.png";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { removeFromPastes } from "../redux/pasteSlice";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const filteredData = pastes
    .map((paste) => {
      const matchTitle = paste.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchContent = paste.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (searchTerm === '' || matchTitle || matchContent) {
        return {
          ...paste,
          highlightedTitle: highlightMatch(truncateText(paste.title, 7), searchTerm),
          highlightedContent: highlightMatch(paste.content, searchTerm),
          matchedContent: matchContent ? paste.content.match(new RegExp(`.{0,20}${searchTerm}.{0,20}`, "i"))?.[0] || paste.content : ""
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="animate-fade-in w-full h-full flex flex-col">
      <div className="glass-card flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">
          My Pastes 
        </h1>
        
        <div className="relative mb-4">
          <img
            className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60 pointer-events-none z-10"
            src={searchIcon}
            alt="Search Icon"
          />
          <input
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-2xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            type="search"
            placeholder="Search your pastes by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {searchTerm && (
          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
            {filteredData.length > 0 
              ? `Found ${filteredData.length} paste${filteredData.length !== 1 ? 's' : ''} matching "${searchTerm}"`
              : `No results for "${searchTerm}"`
            }
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-8  gap-2 sm:gap-8 auto-rows-max">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => ( 
              <div key={paste._id} className="glass-card animate-scale-in transition-all duration-300 relative h-fit shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),4px_0_6px_-1px_rgba(0,0,0,0.1),-4px_0_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1),0_4px_10px_-2px_rgba(0,0,0,0.05),8px_0_25px_-5px_rgba(0,0,0,0.1),-8px_0_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5),0_2px_4px_-1px_rgba(0,0,0,0.3),4px_0_6px_-1px_rgba(0,0,0,0.5),-4px_0_6px_-1px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.8),0_4px_10px_-2px_rgba(0,0,0,0.6),8px_0_25px_-5px_rgba(0,0,0,0.8),-8px_0_25px_-5px_rgba(0,0,0,0.8)] rounded-xl p-3 hover:-translate-y-2 hover:scale-105 cursor-pointer">
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Header with title and actions */}
                  <div className="flex justify-between gap-3 sm:gap-4">
                    <div
                      className="text-lg sm:text-xl font-semibold break-words text-gray-800 dark:text-gray-200 line-clamp-2 cursor-pointer"
                      dangerouslySetInnerHTML={{ __html: paste.highlightedTitle }}
                      title={paste.title}
                    ></div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2 justify-end">
                      <NavLink to={`/?pasteId=${paste?._id}`} title="Edit paste">
                        <button className="p-2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-900 bg-gray-200 text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center">
                          <img className="h-3 w-3 sm:h-4 sm:w-4" src={editIcon} alt="Edit" />
                        </button>
                      </NavLink>
                      <NavLink to={`/pastes/${paste?._id}`} title="View paste">
                        <button className="p-2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-900 bg-gray-200 text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center">
                          <img className="h-3 w-3 sm:h-4 sm:w-4" src={viewIcon} alt="View" />
                        </button>
                      </NavLink>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("📋 Copied to clipboard!");
                        }}
                        className="p-2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-900 bg-gray-200 text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center"
                        title="Copy to clipboard"
                      >
                        <img className="h-3 w-3 sm:h-4 sm:w-4" src={copyIcon} alt="Copy" />
                      </button>
                      <button
                        onClick={() => {
                            handleDelete(paste?._id);
                        }}
                        className="p-2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-900 bg-gray-200 text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center"
                        title="Delete paste"
                      >
                        <img className="h-3 w-3 sm:h-4 sm:w-4" src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Content preview */}
                  {paste.matchedContent ? (
                    <div
                      className="bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 max-h-[100px] sm:max-h-[120px] overflow-hidden relative text-xs sm:text-sm leading-relaxed font-mono text-gray-800 dark:text-gray-200"
                      dangerouslySetInnerHTML={{ __html: highlightMatch(truncateText(paste.matchedContent, 27), searchTerm) }}
                    ></div>
                  ) : (
                    <div className="bg-gray-100/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg p-3 max-h-[100px] sm:max-h-[120px] overflow-hidden relative text-xs sm:text-sm leading-relaxed font-mono text-gray-800 dark:text-gray-200">
                      {truncateText(paste.content, 150)}
                    </div>
                  )}
                  
                  {/* Footer with metadata */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-3 gap-2">
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1">
                        📅 {new Date(paste.createdAt).toLocaleDateString("en-US", { 
                          year: '2-digit', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        🕒 {new Date(paste.createdAt).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-md font-medium">
                      {paste.content.length} chars
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="glass-card text-center py-12 sm:py-16 px-6 sm:px-8 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-800/20 dark:to-gray-900/20">
                <div className="text-5xl sm:text-6xl mb-4">
                  {searchTerm ? '🔍' : '📝'}
                </div>
                <div className="text-xl sm:text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  {searchTerm ? `No pastes found` : "No saved pastes yet"}
                </div>
                <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm 
                    ? `Try searching for something else or create a new paste`
                    : "Create your first paste to get started!"
                  }
                </div>
                {!searchTerm && (
                  <NavLink to="/">
                    <button className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base">
                      ✨ Create Your First Paste
                    </button>
                  </NavLink>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
