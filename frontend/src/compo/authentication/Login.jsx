
import React, { useState } from "react";
import "../Style.css";
import { Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useAuthContext } from "../../context/AuthContext";
const apis = require("../../apis/apis")
const Login = () => {
  const {authUser,setAuthUser} = useAuthContext()
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  //const [loading, setloading] = useState(false)
  const handleClick = () => setShow(!show);

  //for Login
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginInfo);
    const email = loginInfo.email;
    const password = loginInfo.password;
    //setSpinner(true);
    axios
      .post(apis.signinAPI, { email, password })
      .then((result) => {
        //loading = true
        console.log(result.data.userID);
        const senderID = result.data.userID
        if (result.data.message === "User logged in succesful !") {
          toast.success("Login succesful !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            localStorage.setItem(
              "chat-user",
              JSON.stringify({ senderID, email, password })
            );

            setAuthUser({ senderID, email, password });  
          }, 2000);
          
        }
      })
      .catch((err) => {
        console.log(err.response.data);
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
      });
      
  };

  return (
    <div className="form-container">
      <div className="form">
        <h3>Login to your Account</h3>
        <form>
          <input
            type="email"
            name="email"
            background-color="white"
            placeholder="Enter your Email"
            onChange={handleChange}
            autoFocus
            value={loginInfo.email}
          />
          <input
            type={show ? "text" : "password"}
            name="password"
            background-color="white"
            placeholder="Password"
            onChange={handleChange}
            autoFocus
            value={loginInfo.password}
          />
          <Button
            type="button"
            className=" btn-primary bg-slate-800 p-2  text-red-100"
            h="1.75rem"
            mb="15px"
            borderRadius={"8px"}
            size="sm"
            onClick={handleClick}
          >
            {show ? "Hide Password" : "Show Password"}
          </Button>
        </form>

        <Button
          className=" btn-primary bg-blue-700 hover:bg-blue-800 text-red-100"
          type="button"
          colorPalette="blue"
          mb="10px"
          borderRadius={"8px"}
          onClick={handleSubmit}
        >
          LogIn
        </Button>
        <Button
          type="button"
          className=" btn-primary bg-red-600 hover:bg-red-700  text-red-100"
          colorPalette="red"
          mb="10px"
          borderRadius={"8px"}
          width="100%"
          onClick={() => {
            setLoginInfo({
              email: "guest@userexample.com",
              password: "112233",
            });
          }}
        >
          Get Guest User Credentials
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login