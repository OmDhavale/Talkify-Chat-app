import React from 'react'
import Conversations from './Conversations';
import useConversation from '../../zustand/useConversations';
import { useSocketContext } from '../../context/SocketContext';

const UserConv = ({conversation}) => { 
  const {selectedConversation,setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-slate-200 rounded p-2 py-1 cursor-pointer
          ${isSelected?"bg-slate-200":""}
        `}
        onClick={()=> setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src="https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-bold text-gray-900">{conversation.name}</p>
        </div>
      </div>
      <div className="divider my-1 py-0 h-1" />
    </>
  );
} 

export default UserConv