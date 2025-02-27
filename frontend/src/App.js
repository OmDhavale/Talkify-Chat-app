import './App.css';
import { Navigate, Routes, Route } from "react-router-dom";
//import { colorPalettes } from "compositions/lib/color-palettes";
//import { Button } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser} = useAuthContext()
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Homepage/>} exact /> */}
        <Route
          path="/"
          element={authUser ? <Navigate to="/chats" /> : <Homepage />}
        />
        {/* <Route path="/chats" element={<Chatpage />} /> */}
        <Route
          path="/chats"
          element={authUser ? <Chatpage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
