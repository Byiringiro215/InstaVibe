import React, { useEffect, useState } from "react";
import useConversations from'../../../Zustang/useConversation'
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      
      setLoading(true);
      try {

        const token = localStorage.getItem("jwt");

        if (!token) {
          throw new Error("User is not logged in or token is missing");
        }

        console.log("Using JWT Token:", token);

        const res = await fetch("/api/users", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, 
        },
        });
        const data = await res.json();
        console.log("API Response:", data);
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch conversations");
        }

        setConversations(data);
      } catch (error) {
        console.error("Fetch Error:", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
