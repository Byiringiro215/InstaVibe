import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useAuthContext} from '../../../../src/Context/AuthContext'


const useLogin = () => {
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();

    const login=async (username,password)=>{
        const success=handleInputErrors({username,password})
    if(!success) return;
        setLoading(true);
        try {
            const res=await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body:JSON.stringify({username,password}),
            })
            const data=await res.json();
            console.log(data);
            if (data.error) {
                throw new Error(data.error);
            }
//             if(!data.token){
//                 throw new Error("No token received from server");
//             }
// console.log("Storing Token:",data.token);
        localStorage.setItem("jwt",data.token);
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }
 return{loading,login};
}

export default useLogin


function handleInputErrors({username,password}){
    if ( !username || !password ) {
        toast.error("Please fill all the fields")
        return false
    }
   
    if (password.length < 8) {
        toast.error("Password must be atleast 8 characters")
        return false
    }
    return true
}