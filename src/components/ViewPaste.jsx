import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id)

  return (
    <div className='min-w-[50vw] max-w-[50vw] '>
        <div className="pl-4 text-2xl overflow-x-scroll resize-none custom-scrollbar w-full font-bold rounded-2xl m-4">
          {paste.title}
        </div>
        
          <textarea 
            className='rounded-2xl p-4 w-full ml-4 overflow-auto custom-scrollbar' 
            value={paste.content} 
            rows={14} 
          />

    </div>
    )
}

export default ViewPaste