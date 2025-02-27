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
        // <div className="text-black fw-bold text-center items-center justify-center">
        //   <div className="text-black fw-bold text-center items-center justify-center">
        //     <Loader2 className="animate-spin items-center justify-center" />
        //     Loading Users...
        //   </div>
        // </div>
        // 4 divs for user loading state
        <div> 
        <div class="flex animate-pulse space-x-4">
          <div class="size-10 rounded-full bg-gray-200"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div class="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div class="flex animate-pulse space-x-4">
          <div class="size-10 rounded-full bg-gray-200"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div class="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div class="flex animate-pulse space-x-4">
          <div class="size-10 rounded-full bg-gray-200"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div class="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div class="flex animate-pulse space-x-4">
          <div class="size-10 rounded-full bg-gray-200"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div class="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        </div>
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