import React, { useEffect } from 'react'
import { useSocketContext } from '../../context/SocketContext'
//import useConversation from '../../zustand/useConversations'
import useGetConversations from './useGetConversations'
import useConversation from '../../zustand/useConversations'

const useListenMessages = () => {
  const { socket }= useSocketContext()
  const { messages, setMessages } = useConversation()

  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        Array.isArray(messages)?setMessages([...messages,newMessage]):setMessages([newMessage])
    })

    return ()=>{
        socket?.off("newMessage")
    }
  },[socket,setMessages,messages])
}

export default useListenMessages