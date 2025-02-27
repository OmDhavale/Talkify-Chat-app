import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversations';
import { extractTime } from '../utils/extractTime';

const Message = ({message}) => {
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()
  
  const fromMe = message.senderID === authUser.senderID
  const chatClassName = fromMe ? 'chat-end':'chat-start'
  const bubbleBgColor = fromMe ? "bg-indigo-950" : "bg-purple-950";

  const formattedTime = extractTime(message.createdAt)
  console.log(message);
  return (
    
    <>
      <div className={`chat ${chatClassName}`}>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.chat}</div>
        <div className="chat-footer opacity-50 text-xs text-white flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
      {/* <div className="chat chat-start">
        <div className="chat-bubble bg-purple-950">{message.chat}</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          11:11
        </div>
      </div> */}
    </>
  );
}

export default Message