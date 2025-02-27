import { useEffect, useState } from "react"
import useConversation from "../../zustand/useConversations"
import axios from "axios"
import { useAuthContext } from "../../context/AuthContext";
const apis = require("../../apis/apis")
const useGetMessages = ()=>{
    const { authUser } = useAuthContext();
    //const { messages, setMessages, selectedConversation } = useConversation();
    const {messages,setMessages,selectedConversation}= useConversation()
    //const [mess, setMess] = useState([])
    //const{selectedConversation} = useConversation()
    useEffect(()=>{
        const getMessages = async ()=>{
            try{
                
                await axios
                  .post(apis.getMessageAPI, {
                    
                      senderID: authUser.senderID,
                      receiverID: selectedConversation._id,
                    
                  })
                  .then((res) => {
                    console.log("response: ", res);
                    console.log("data:", res.data);
                    setMessages(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }
            catch{
                console.log("error occured")
            }
        }
        //getMessages()
        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])

    return {messages}
}
export default useGetMessages