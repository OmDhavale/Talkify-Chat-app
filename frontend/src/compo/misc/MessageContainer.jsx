import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useGetMessages from './useGetMessages';
import useListenMessages from './useListenMessages';

const apis = require("../../apis/apis")
const MessageContainer = () => {
  const { messages  } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef()
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behaviour:"smooth"})
    },200)
    
  },[messages])
  console.log("messages: ",messages)
  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* {messages.length >=0  &&
        messages.map((message) => (
          <div key={message._id} ref = {lastMessageRef}>
            <Message message={message} />
          </div>
        ))} */}
        {(Array.isArray(messages) ? messages : [messages]).map((message) => (
  <div key={message._id} ref={lastMessageRef}>
    <Message message={message} />
  </div>
))}

      {messages.length === 0 && 
      <div className="text-white fw-bold text-center items-center justify-center">Send a message to start conversation
      </div>
      }
    </div>
  );
}

export default MessageContainer