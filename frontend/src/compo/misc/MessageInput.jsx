import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { LuSend } from "react-icons/lu";
import useConversation from "../../zustand/useConversations";
import useSendMessage from "./useSendMessage";
import { useAuthContext } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
const apis = require("../../apis/apis")
const MessageInput = () => {

const {authUser} = useAuthContext()
  //for Login
    const [loading, setLoading] = useState(false);
  const {messages,setMessages, selectedConversation} = useConversation()
  const [mInfo, setmInfo] = useState({
    senderID:"",
    receiverID:"",
    chat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyMInfo = { ...mInfo };
    copyMInfo[name] = value;
    setmInfo(copyMInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mInfo);

    const chat = mInfo.chat;
    console.log(selectedConversation._id);
    console.log(authUser.senderID)
    
  //   //original
  if(!chat) return
  const senderID = authUser.senderID;
  const receiverID = selectedConversation._id;
  // console.log({ senderID, receiverID, chat });
   setLoading(true);
    axios
      .post(
        apis.sendMessageAPI,
        ({
          senderID, receiverID,
          chat
        }),
        
      )
      .then((result) => {
        setLoading(false);
        // console.log("Msg sent: ",result.data);
        setMessages([...messages,result.data])
        setmInfo({ ...mInfo, chat: "" });
        
      })
      .catch((err)=>{
        setLoading(false);
        console.log("Error: ",err)
      })
      // .finally(()=>{
      //   setmInfo.chat("")
      // })

  };

  return (
    <div className="flex">
      {/* <form> */}
        <Input
        bg="white"
        className="input w-full my-1"
        w="100%"
        colorPalette="accent"
        border="none"
        name="chat"
        value={mInfo.chat}
        onChange={handleChange}
        placeholder="Type a Message..."
        borderRadius="20px"
      />
      
      <Button
        type="button"
        className="btn btn-primary "
        colorPalette="blue"
        ml="0px"
        borderRadius={"40px"}
        onClick={handleSubmit}
      >
        
        {loading ? (
            <div className="text-white fw-bold text-center items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div className="text-white text-center items-center justify-center">
              <LuSend />
            </div>
          )}
      </Button>
      {/* </form> */}
    </div>
  );
};

export default MessageInput;
