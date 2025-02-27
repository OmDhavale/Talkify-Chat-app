import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
//import axios from 'axios'
import { Box } from '@chakra-ui/react';
//import MyChats from '../compo/misc/MyChats';
import ChatBox from '../compo/misc/ChatBox';
import   SideDrawer  from '../compo/misc/SideDrawer';
//import SearchInput from '../compo/misc/SearchInput';
const Chatpage = () => {
    // const [chats,setchats] = useState([]);
  return (
    <div style={{width: "100%"}}>
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        padding="10px"
      >
       
        <ChatBox />
      </Box>
    </div>
    // <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white bg-clip-padding backdrop-filter min-w-96 mx-auto'>
    //     <SearchInput/>
    //     <ChatBox/>

    //   </div>
  );
}

export default Chatpage