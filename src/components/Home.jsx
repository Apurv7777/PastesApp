import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId'); // query-param = pasteId
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  async function createPaste() {
    if (title.trim() === '') {
      toast.error('Please add a title!');
      return;
    }
    if (value.trim() === '') {
      toast.error('Please add some content!');
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
      added: false,
    }

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      try {
        await dispatch(addToPastes(paste)).unwrap();
        setTitle('');
        setValue('');
        setSearchParams({});
      } catch (error) {
        // Error handled by slice/toast
      }
    }
  }

  function updatePaste() {
    if (title.trim() === '') {
      toast.error('Please add a title!');
      return;
    }
    if (value.trim() === '') {
      toast.error('Please add some content!');
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
      added: true,
    }
    dispatch(updateToPastes(paste));
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId)
      // Guard against paste not being loaded yet
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    } else {
      setTitle('');
      setValue('');
    }
  }, [pasteId, allPastes]);

  return (
    <div className="animate-fade-in w-full h-full">
      <div className="glass-card w-full h-full">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800 dark:text-gray-200">
          {pasteId ? '✏️ Edit Paste' : 'Create New Paste'}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <input
            className="flex-1 px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            type="text"
            placeholder='Enter a title for your paste...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className={`px-4 sm:px-6 py-3 sm:py-3.5 font-semibold rounded-lg min-w-[120px] sm:min-w-[140px] transition-all duration-300 active:scale-95 text-sm sm:text-base ${pasteId
                ? (title.trim() && value.trim())
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                : (title.trim() && value.trim())
                  ? 'bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
              }`}
            onClick={pasteId ? updatePaste : createPaste}
            disabled={!title.trim() || !value.trim()}
          >
            {pasteId ? "💾 Update" : "✨ Create"}
          </button>
        </div>

        <div className="mb-4 sm:mb-6 flex-1">
          <textarea
            className="w-full h-[calc(100vh-280px)] px-4 py-3 sm:py-4 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono leading-relaxed resize-none"
            value={value}
            placeholder='Start typing your content here...

✨ Tips:
• Use this space for code snippets, notes, or any text you want to save
• Your content will be automatically saved with syntax highlighting
• You can search through all your pastes later'
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="p-4 sm:p-5 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg text-sm sm:text-base text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">💡 Pro Tips:</strong>
          <ul className="mt-2 pl-5 space-y-1">
            <li>Use descriptive titles to find your pastes easily</li>
            <li>Your pastes are automatically saved to the cloud</li>
            <li>You can edit any paste by clicking the edit button</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home;