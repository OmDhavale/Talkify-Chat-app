/**
 * For sending message
 */
const cors = require("cors");
const protectRoute = require("../middleware/protectRoute")
const sendMessage = require("../controller/message.controller");

module.exports = (app)=> {
    app.use(cors());
    
    //app.post("/api/chats/send/message", [protectRoute.protectRoute], sendMessage.sendMessage);
    app.post("/api/chats/send/message", sendMessage.sendMessage);
     app.post("/api/get/message", sendMessage.getMessage);
    //app.get("/:id", sendMessage.getMessage);
}