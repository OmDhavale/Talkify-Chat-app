import { Box, Button } from '@chakra-ui/react';
// import { LuSend } from "react-icons/lu";
import { PiChatTextDuotone } from "react-icons/pi";
import React, { useEffect, useState } from 'react'
import MessageContainer from './MessageContainer';
import MessageInput from './MessageInput';
import { motion } from "framer-motion";
import useConversation from '../../zustand/useConversations';
import { useAuthContext } from '../../context/AuthContext';
import SearchInput from './SearchInput';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ChatBox = () => {
  // const noChatSelected = false
  const {selectedConversation,setSelectedConversation} = useConversation()
  
  useEffect(()=>{
    return ()=> setSelectedConversation(null)
  },[setSelectedConversation])

  return (
    <div className="grid w-full bg-blue-800 rounded-md">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* the title bar */}
          <div className="bg-indigo-950 px-4 py-3 mb-2 rounded-md h-14">
            {/* <button className={"text-white"}onClick={setSelectedConversation("")}>Back</button> */}
            <button
              className="text-white hover:text-blue-700"
              onClick={() => setSelectedConversation(null)}
            >
              <IoArrowBackCircleOutline
                className="d-inline text-white hover:text-blue-700"
                style={{ fontSize: "3vw" }}
              />
            </button>
            <span className="text-gray-200 font-bold">
              {" "}
              To: {selectedConversation.name}
            </span>
          </div>
          {/* the main messages box */}
          <Box className="overflow-auto" w="100%" p="5px 10px 5px 10px">
            <MessageContainer />
          </Box>
          {/* message input bar at bottom */}
          <div className="mt-auto">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatBox

const NoChatSelected=()=>{
  const {authUser} = useAuthContext()
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    // <div className="grid w-full bg-indigo-900 items-center justify-center">
    <div className="grid w-full bg-indigo-900">
      <div className="text-white justify-center">
        {/* <h3>Welcome {authUser.email} 👋</h3>
        <h4>Select a chat to start messaging</h4>
        <PiChatTextDuotone
          className="size-12"
          onClick={() => setIsExpanded(!isExpanded)}
          cursor={"pointer"}
        > */}
        {/* <Button onClick={() => setIsExpanded(!isExpanded)}> */}
          {/* {isExpanded ? "Close tab" : "Show Users"} 
        </PiChatTextDuotone>*/}
        {/* <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-gray-200 p-0 rounded-xl"
        > */}
          <SearchInput />
        {/* </motion.div> */}
      </div>
    </div>
  );
}