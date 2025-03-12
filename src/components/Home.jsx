import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes, fetchPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId'); // query-param = pasteId
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const pasteLoading = useSelector((state) => state.paste.status === 'loading');

  function handleSave() {
    if (title.trim() === '') {
      toast.error('Please add a title!');
      return;
    }

    const paste = {
      title,
      content: value,
    };

    if (pasteId) {
      dispatch(updateToPastes({ ...paste, _id: pasteId }));
      toast.success("Paste Updated!");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste Created Successfully!");
    }

    // Reset form fields after adding/updating
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  useEffect(() => {
    dispatch(fetchPastes()); // Fetch pastes when component mounts
  }, [dispatch]);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
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
    <div className='relative w-[60vw]'>
      <div className='flex flex-col md:flex-row'>
        <input 
          className="p-2 w-full md:w-auto flex-grow pl-5 font-bold rounded-2xl m-4"
          type="text" 
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={pasteLoading}
        />

        <button className='m-3 w-full md:w-80' onClick={handleSave} disabled={pasteLoading}>
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>

      <div className=''>
        <textarea 
          className='rounded-2xl p-4 w-full ml-4 overflow-auto custom-scrollbar' 
          value={value} 
          placeholder='Enter your content' 
          onChange={(e) => setValue(e.target.value)} 
          rows={14} 
          disabled={pasteLoading}
        />
      </div>
    </div>
  );
};

export default Home;
