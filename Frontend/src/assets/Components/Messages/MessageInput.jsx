import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendMessage from '../Hooks/useSendMessage';

const MessageInput = () => {
const [message,setMessage]=useState("");
const {loading,sendMessage}=useSendMessage();

  const handleSubmit=async (e)=>{
e.preventDefault();
if (!message.trim()) return;
await sendMessage(message);
setMessage("");
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input
             type="text" 
             className='border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white'
             placeholder='Send a message'
             value={message}
             onChange={(e)=>setMessage(e.target.value)}
             disabled={loading}
             />
             <button type="submit" className='absolute inset-y-0 end-1 flex items-center p-3' disabled={loading}>
            {loading?<div className='loading loading-spinner'></div> : <BsSend />}
             </button>
        </div>
    </form>
  )
}

export default MessageInput
