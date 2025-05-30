import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../Hooks/useGetConversations";
import { getRandomEmoji } from "../../../utils/emojis";
import { useEffect } from "react";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  useEffect(() => {
    console.log("CONVERSATIONS:", conversations);
  }, [conversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <>
          {conversations.length === 0 ? (
            <p className="text-center text-gray-500">No conversations found</p>
          ) : (
            conversations.map((conversation, index) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                emoji={getRandomEmoji()}
                lastIndex={index === conversations.length - 1}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Conversations;
