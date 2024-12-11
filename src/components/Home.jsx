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
  const allPastes = useSelector((state)=>state.paste.pastes);

  function createPaste(){
    if(title===''){
    toast.error('Please add title !');
    return;
    }
    const paste = {
    title: title,
    content: value,
    _id: pasteId || Date.now().toString(36),
    createdAt: new Date().toISOString(),
    added:false,
    }

    if(pasteId){
    dispatch(updateToPastes(paste));
    } else {
    dispatch(addToPastes(paste));
    }

    if(paste.added){
    setTitle('');
    setValue('');
    setSearchParams({});
    }
  }

  function updatePaste(){
    if(title===''){
    toast.error('Please add title !');
    return;
    }
    const paste = {
    title: title,
    content: value,
    _id: pasteId || Date.now().toString(36),
    createdAt: new Date().toISOString(),
    added:true,
    }
    dispatch(updateToPastes(paste));
  }

  useEffect(()=>{
    if(pasteId){
    const paste = allPastes.find((p)=>p._id === pasteId)
    setTitle(paste.title);
    setValue(paste.content);
    } else {
    setTitle('');
    setValue('');
    }
  },[pasteId]);

  return (
  <div className='relative'>
    <div className='flex flex-col md:flex-row'>
    <input 
      className="p-2 w-full md:w-auto flex-grow pl-5 font-bold rounded-2xl m-4"
      type="text" 
      placeholder='Enter title'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
    />

    <button className='m-3 w-full md:w-80' onClick={pasteId ? updatePaste : createPaste}>
      {
      pasteId ? "Update Paste" : "Create My Paste"
      }
    </button>
    </div>

    <div className=''>
      <textarea 
      className='rounded-2xl p-4 w-full ml-4 overflow-auto custom-scrollbar' 
      value={value} 
      placeholder='Enter your content' 
      onChange={(e)=>setValue(e.target.value)} 
      rows={14} 
      />
    </div>

  </div>
  )
}

export default Home;