import React, { useState } from 'react'
import "../Style.css"
import { Button } from '@chakra-ui/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const apis = require("../../apis/apis");
// import { VStack } from "@chakra-ui/react"
// import { Fieldset } from "@chakra-ui/react"
// import { Field } from "@/components/ui/field";
//import { DecorativeBox } from "compositions/lib/decorative-box";
const Signup = () => {
  const {authUser,setAuthUser} = useAuthContext()
    const [show,setShow] = useState(false) 
    const handleClick= ()=> setShow(!show)
    const navigate = useNavigate()
    //for signup
  const[signupInfo,setsignupInfo] = useState({
    name:'',
    email: '',
    password: ''
    
  })
  const handlesuChange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value)
    const copySignUpInfo = {...signupInfo}
    copySignUpInfo[name] = value
    setsignupInfo(copySignUpInfo)

  }
  const handleSignUp = async (e)=>{
      e.preventDefault();
      //const { name,userid,email,password,userType } = signupInfo;
      const name = signupInfo.name;
      const email = signupInfo.email;
      const password = signupInfo.password;


      if(!name || !email || !password){
        toast.error("Please Enter Data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      
          console.log(signupInfo)
          // try{
          
            //axios.post('https://ecommercebackend-8lcw.onrender.com/signup',{name,userID,email,password,userType}) //type here "keys" as mentioned in API one capslock can also result into error, also sequence must be same !
            axios.post(apis.signupAPI,{ name,email,password }) //for local running
            .then(result=>{
              console.log(result)
              //for pop up showing success !
              const senderID = result.data.userID;
              toast.success("Account Created, you can now Login !",{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              
              // localStorage.setItem("chat-user",JSON.stringify({senderID,email,password}))

              // setAuthUser({senderID, email, password });
            })
            .catch(err=>{
              console.log(err.response.data)
              //for showing pop up of error on page
              toast.error(`${err.response.data.message}`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            })
          }
    //const postDetails=(pics)=>{}
  return (
    <div className="form-container">
      {/*Code for SignUp page  */}
      <div className="form">
        <h3>Create a New Account</h3>
        <form>
          <input
            type="name"
            name="name"
            placeholder="Enter your name"
            onChange={handlesuChange}
            autoFocus
            value={signupInfo.name}
          />
          <br></br>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handlesuChange}
            autoFocus
            value={signupInfo.email}
          />
          <br></br>
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handlesuChange}
            autoFocus
            value={signupInfo.password}
          />
          <Button
            type="button"
            colorPalette="cyan"
            className=" btn-primary bg-slate-800 p-2  text-red-100"
            h="1.75rem"
            mb="15px"
            borderRadius={"8px"}
            size="sm"
            onClick={handleClick}
          >
            {show ? "Hide Password" : "Show Password"}
          </Button>

          {/* <p>Profile Pic</p>
          <input
            type="file"
            accept='image/*'
            name="image"
            onChange={(e)=>postDetails(e.target.files[0])}
            autoFocus
            //value={signupInfo.password}
          /> */}
        </form>
        <Button
          type="submit"
          colorPalette="cyan"
          className="btn btn-primary "
          mb="10px"
          borderRadius={"8px"}
          onClick={handleSignUp}
        >
          SignUp
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup