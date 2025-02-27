"use client";
import React from "react";
import { Tabs } from "@chakra-ui/react";
//import { LuFolder, LuUser } from "react-icons/lu";
import { Text, Box, Container, Center } from "@chakra-ui/react";
import Login from "../compo/authentication/Login";
import Signup from "../compo/authentication/Signup";
//import { useAuthContext } from "../context/AuthContext";

const Homepage = () => {
  
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        p={3}
        bg={"#c8c5ff"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="0px"
      >
        <Center>
          <Text fontSize={"3xl"} fontFamily="Work sans" color={"black"}>
            Talkify
          </Text>
        </Center>
      </Box>
      <Box
        d="flex"
        p={3}
        bg={"#c8c5ff"}
        w="100%"
        justifyContent={"center"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="0px"
      >
        <Tabs.Root defaultValue="login" variant="plain">
          <Tabs.List bg="white" rounded="l3" p="1" width="100%">
            <Tabs.Trigger
              value="login"
              width="50%"
              alignItems="center"
              justifyContent="center"
            >
              <Center>Login</Center>
              {/* <div display= "flex"
  justify-content="center"
  align-items="center"
  padding="10vh" ><p>Login</p></div> */}
            </Tabs.Trigger>
            <Tabs.Trigger
              value="signup"
              width="50%"
              alignItems="center"
              justifyContent="center"
            >
              SignUp
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l3" bg={"#d0cdfc"} />
          </Tabs.List>
          <Tabs.Content value="login">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <Signup />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Homepage;
