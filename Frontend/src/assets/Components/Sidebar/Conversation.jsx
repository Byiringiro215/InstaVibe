import React from 'react'
import useConversation from '../../../Zustang/useConversation'
import { useSocketContext } from '../../../Context/SocketContext';
const Conversation = ({conversation,lastIndex,emoji}) => {
const {selectedConversation,setSelectedConversation}=useConversation();
const {onlineUsers}=useSocketContext();
const isOnline=onlineUsers.includes(conversation._id);
const isSelected=selectedConversation?._id===conversation._id;
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-blue-400 rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-blue-500":""}
      `}
      onClick={()=>setSelectedConversation(conversation)}
      >
      <div className={`avatar ${isOnline?"online":"offline"}`}>
        <div className='w-12 rounded-full'>
<img src={conversation.profilePic} />
        </div>
      </div>

<div className='flex flex-col flex-1'>
<div className='flex gap-3 justify-between'>
    <p className='font-bold text-gray-200'>{conversation.fullName}</p>
    <span className='text-xl'>{emoji}</span>
</div>
</div>

    </div>
  {!lastIndex && <div className='divider my-0 py-0 h-1'/>}
        
  
    </>
  )
}

export default Conversation
