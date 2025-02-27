const Chat = require("../model/chatModel");
const Message = require("../model/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");
exports.sendMessage = async (req, res) => {
  console.log("Message sent");
  //   //
  //   console.log("Request body:", req.body); // Debugging line

  //   if (!req.body || !req.body.sender) {
  //     return res.status(400).json({ error: "Sender ID is missing" });
  //   }

  //   console.log("Sender ID:", req.body.sender._id);
  //   //
  try {
    console.log(req.body);
    const { chat } = req.body;
    //const { id: receiverID } = req.params;
    const receiverID = req.body.receiverID;
    //console.log(req.params)
    //req.user = user
    //const senderID = req.user._id;
    const senderID = req.body.senderID;
    //console.log(req.user._id);
    ///const senderID = req.body.sender?._id;
    let conversation = await Chat.findOne({
      participants: { $all: [senderID, receiverID] },
    });
    console.log(conversation);

    if (!conversation) {
      conversation = await Chat.create({
        participants: [senderID, receiverID],
      });
    }

    const newMessage = new Message({
      senderID: senderID,
      receiverID: receiverID,
      chat: chat,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]);

    /**
     * SOCKET IO FUNCTIONALITY WILL GO HERE
     */

    const receiverSocketId = getReceiverSocketId(receiverID)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    //res.status(201).send(newMessage);
    console.log("✅ Message saved:", newMessage); // ✅ Debug
    return res.status(201).json(newMessage);
    //res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internmknal server error" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    // const { id: userToChatId } = req.params;
    const receiverID = req.body.receiverID; //--
    // // const senderID = req.user._id;
    const senderID = req.body.senderID; //--
    //const { senderID, receiverID } = req.query;
    console.log(req.body)
    const conversation = await Chat.findOne({
      participants: { $all: [senderID, receiverID] },
    }).populate("messages"); //Not reference but actual "messages"

    if (!conversation) return res.status(200).send({});
    const messages = conversation.messages
    res.status(200).send(messages)
    console.log("All Messages shown between: \nSenderID: ",senderID,"ReceiverID: ",receiverID)
  } catch (error) {
    console.log("Error in getmessage controller: ");
    res.status(500).send({ message: "Internal server error" });
  }
};
