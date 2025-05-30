import React, { useState } from 'react'
import { useAuthContext } from '../../../Context/AuthContext';
import toast  from 'react-hot-toast'

const useSignup = () => {
 const [loading,setLoading]=useState(false);
const {setAuthUser}=useAuthContext();

 const signup=async ({fullName,username,password,confirmPassword,gender})=>{

    const success=handleInputErrors({fullName,username,password,confirmPassword,gender})
    if(!success) return;

    setLoading(true);
    try {
        const res=await fetch('http://localhost:5000/api/auth/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify({fullName,username,password,confirmPassword,gender})
        })

        const data=await  res.json();
        if (data.error) {
            throw new Error(data.error)
        }
        //storing in local storage
        localStorage.setItem("chat-user", JSON.stringify(data)); // Save to local storage
    toast.success("Account created successfully!");

//context
setAuthUser(data);

        console.log(data)
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
    }
 };

return {loading,signup};

 };
export default useSignup

function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false
    }
    if (password!==confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }
    if (password.length < 8) {
        toast.error("Password must be atleast 8 characters")
        return false
    }
    return true
}
