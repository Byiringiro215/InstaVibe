import React, { useEffect, useState } from 'react'
import useConversation from '../../../Zustang/useConversation'
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading,setLoading]=useState(false)
  const {messages,setMessages,selectedConversation}=useConversation();

  useEffect(()=>{
    const getMessages=async ()=>{
        setLoading(true);
        try {

            const token = localStorage.getItem('jwtToken'); 

            console.log("Selected Conversation:", selectedConversation);
            console.log("Selected Conversation ID:", selectedConversation?._id);
            

            const res=await fetch(`/api/messages/${selectedConversation._id}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
            });
    const data=await res.json();
    if (data.error) {
        throw new Error(error.message);
    }
    setMessages(data);
        } catch (error) {
            // toast.error(error.message)
        }finally{
            setLoading(false)
        }
    };
    if (selectedConversation?._id) getMessages()
   
  },[selectedConversation?._id,setMessages]);
  return {messages,loading};
}

export default useGetMessages
