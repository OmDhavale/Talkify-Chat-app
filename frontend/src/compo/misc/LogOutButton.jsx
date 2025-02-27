import { Button } from '@chakra-ui/react';
import React from 'react'
// import { useState } from 'react';
import axios from "axios";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
const apis = require("../../apis/apis");
const LogOutButton = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  //const [loading,setloading] = useState(false)
  const logout = async()=>{
    
      
      axios.post(apis.logoutAPI)
      .then((result) => {
              //loading = true
              console.log(result);
              if (result.data.message === "Logged out succesful") {
                localStorage.removeItem("chat-user")
                setAuthUser(null)
              }
            })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  return (
    <div className="mt-auto">
      <Button className=" bg-slate-100 hover:bg-red-400 p-2 text-black hover:text-white rounded-md" onClick={logout}>
        LogOut
        <IoLogOut className=" cursor-pointer size-5" />
      </Button>
    </div>
  );
}

export default LogOutButton