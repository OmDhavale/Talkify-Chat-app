import React from 'react'
import useConversation from '../../zustand/useConversations'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext'
const apis = require("../../apis/apis")
const useSendMessage = () => {
  const{messages,setMessages,selectedConversation } = useConversation()
  const {authUser} = useAuthContext()
  const sendMessage = (chat)=>{
    console.log(selectedConversation._id)
    axios
      // .post(`http://localhost:4000/chats/send/${selectedConversation._id}`, {
      .post(apis.sendMessageAPI, {
        sender: { _id: authUser._id },
        chat,
      })
      .then((resp) => {
        setMessages([...messages, resp]);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
  return {sendMessage}
}

export default useSendMessage