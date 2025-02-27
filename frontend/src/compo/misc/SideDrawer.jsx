import { Box, Text } from '@chakra-ui/react'
// import { BellIcon } from '@chakra-ui/icons'
import "bootstrap/dist/css/bootstrap.css";
import React from 'react'
import SearchInput from "./SearchInput";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import LogOutButton from './LogOutButton';
const SideDrawer = () => {
 const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth={"5px"}
      >
        {/* <button>Search User</button> */}
        {/* <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Close tab" : "Show Users / Logout"}
        </Button> */}
        <LogOutButton />
        <Text fontSize={"2xl"} fontFamily={"Work sans"}>
          Talkify-App
        </Text>
        <Text>Notification</Text>
      </Box>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-gray-200 p-0 rounded-xl"
      >
        <SearchInput />
      </motion.div>
    </div>
  );
}

export default SideDrawer