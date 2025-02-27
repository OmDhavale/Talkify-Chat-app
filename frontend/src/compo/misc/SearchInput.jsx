import { Box, Button, Separator } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input } from "@chakra-ui/react";
import { LuUserRoundSearch } from "react-icons/lu";
import Conversations from './Conversations';
import LogOutButton from './LogOutButton';
import useConversation from '../../zustand/useConversations';
import useGetConversations from './useGetConversations';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';

//import { InputGroup } from "@/components/ui/input-group";
const SearchInput = () => {
  /**
   * Functionality for searching any user in db
   */
//   const [search,setSearch]=useState("")
//   const { setSelectedConversation } = useConversation()
//   const { conversations } = useGetConversations()
//   const handleSubmit = (e)=>{
//     e.preventDefault()
//     if(!search)return;
//     if(search.length<3){
//       toast.error("Search term must be at least 3 characters long")
//     }
//     const conversation = conversations.find((c)=>c.name.toLowerCase().includes(search.toLowerCase()))
//     if(conversation){
//       setSelectedConversation(conversation)
//       setSearch("")

//     }
//     else{
//       toast.error("No user found")
//     }
//   }
const {authUser} = useAuthContext()
  return (
    <Box
      //display="flex"
      //justifyContent="space-between"
      //alignItems={"center"}
      bg="white"
      //w="100%"
      p="5px 10px 5px 10px"
      //borderRadius={"10px"}
      borderWidth={"5px"}
    >
      <div className="text-black fw-bold text-center items-center justify-center">
        Welcome {authUser.email} 👋, select any chat to Talk
      </div>
      {/* <input type="text" placeholder="Search User" /> */}
      <Box display="flex" mb="0px">
        {/* The functionality for searching any user */}
        {/* <Input
          className="input w-full shadow-xl border-0"
          colorPalette="white"
          bg="whiteAlpha.200"
          placeholder="Search User"
          borderRadius={"20px"}
          //value={search}
          //onChange={(e)=>setSearch(e.target.value)}
        />
        <Button
          className="btn btn-primary shadow-xl"
          type="button"
          colorPalette="blue"
          ml="10px"
          borderRadius={"15px"}
          //onClick={handleSubmit}
        >
          <LuUserRoundSearch />
        </Button> */}
      </Box>
      <Separator />
      <Conversations />
      {/* <LogOutButton /> */}
    </Box>
  );
}

export default SearchInput