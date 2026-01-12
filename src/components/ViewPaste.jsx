import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom'
import { detectLinks } from '../utils/detectLinks';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const { pastes: allPastes, status } = useSelector((state) => state.paste);
  const paste = allPastes.find((p) => p._id === id)

  if (status === 'loading') {
    return (
      <div className="animate-fade-in w-full h-full flex items-center justify-center">
        <div className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Loading...
        </div>
      </div>
    )
  }

  if (!paste) {
    return (
      <div className="animate-fade-in w-full h-full flex items-center justify-center">
        <div className="glass-card text-center py-12 sm:py-16 max-w-md">
          <div className="text-5xl sm:text-6xl mb-4">❌</div>
          <div className="text-xl sm:text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Paste not found
          </div>
          <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
            The paste you're looking for doesn't exist or has been deleted.
          </div>
          <NavLink to="/pastes">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
              📚 Back to Pastes
            </button>
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in w-full h-full flex flex-col">
      <div className="glass-card w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 break-words word-wrap overflow-y-auto overflow-x-hidden flex-1 max-w-full max-h-[4.5rem] sm:max-h-[5.25rem] lg:max-h-[6rem] leading-tight">
            {paste.title}
          </h1>

          {/* Action buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <NavLink to={`/?pasteId=${paste._id}`}>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
                ✏️ Edit
              </button>
            </NavLink>
            <button
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("📋 Copied to clipboard!");
              }}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              📋 Copy
            </button>
            <NavLink to="/pastes">
              <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
                ← Back
              </button>
            </NavLink>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
          <span className="flex items-center gap-1">
            📅 Created: {new Date(paste.createdAt).toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1">
            🕒 Time: {new Date(paste.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
          <span className="px-3 py-1 bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-full font-medium">
            {paste.content.length} characters
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div
            className="bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 w-full font-mono text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap border border-gray-200 dark:border-gray-700 word-wrap break-words"
            dangerouslySetInnerHTML={{ __html: detectLinks(paste.content) }}
          />
        </div>
      </div>
    </div>
  )
}

export default ViewPaste