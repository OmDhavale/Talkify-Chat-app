import axios from "axios"
import { useEffect, useState } from "react"
const apis = require("../../apis/apis")
const useGetConversations = ()=>{
    const [conversations,setConversations]= useState([])
    useEffect(()=>{
        
              // axios.get("http://localhost:4000/get/users").then((result) => {
                axios.get(apis.getUsersAPI).then((result) => {
                  console.log(result);
                  setConversations(result.data);
                });
            
    },[])

    return(conversations)
}
export default useGetConversations