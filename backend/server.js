
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//const { chats } = require("./data/data")


const cors = require("cors");
const { app, server } = require("./socket/socket.js");

// const corsOptions = {
//   origin: ["http://localhost:3000","http://localhost:3000/chats"], ////for running locally
//   methods: ["GET","POST","PUT","DELETE"],
//   //allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
//app.use(cors(corsOptions));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};
 app.use(cors(corsOptions));
app.use(cors())
app.use(express.json());
require("dotenv").config();
// // ✅ Handle Preflight Requests Correctly
// app.options("*", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // 🔥 Change '*'
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.setHeader("Access-Control-Allow-Credentials", "true"); // ✅ Required when using credentials
//     res.sendStatus(200);
// });



//mongoose.connect("mongodb://localhost/talkifydb"); //for local running
console.log(process.env.MONGODB_URI)
mongoose.connect( process.env.MONGODB_URI );
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to DB");
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cookieParser());
/**
 * Stitch the route to the server
 */
require("./routes/auth.route.js")(app);
// app.use("/message", messageRoutes);
require("./routes/message.route.js")(app);

// app.get("/chats", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // ✅ Explicitly set CORS header
//   res.json({ message: "CORS should work now!" });
// });
require("./routes/users.route.js")(app);
const PORT = process.env.PORT;
//const PORT = 4000 || process.env.PORT;
//const PORT = process.env.PORT
server.listen(PORT, console.log(`Server started on port: ${PORT}`));
