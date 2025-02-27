import React, { useEffect, useState } from 'react'
import UserConv from './UserConv';
import { Loader2 } from "lucide-react"; 
import useGetConversations from './useGetConversations'
import axios from 'axios';
const apis = require("../../apis/apis")

const Conversations = () => {
  // const {conversations} = useGetConversations();
  // console.log("CONVERSATIONS:", conversations)
  const [startloadingButton, setStartLoadingButton] = useState({});
  const [conversations, setConversations] = useState([]);
      useEffect(() => {
        console.log("hello")
        axios
          .get(apis.getUsersAPI)
          .then((result) => {
            setConversations(result.data);
            setStartLoadingButton(0);
            console.log(result)
          })
          .catch((err) => {
            console.log("Empty", err);
          });
      }, []);
  return (
    <div className="py-2 flex flex-col">
      {startloadingButton ? (
        <>
          <Loader2 className="animate-spin" />
          Loading Users...
        </>
      ) : (
        <></>
      )}
      {conversations.map((conversation) => (
        <UserConv key={conversation._id} conversation={conversation} />
      ))}
      {/* <button onClick={handleClick()}>Click</button> */}
    </div>
  );
}

export default Conversations