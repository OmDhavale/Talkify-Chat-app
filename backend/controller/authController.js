const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel.js");
//Logic to sign up/ register a user
exports.signup = async (req, res) => {
  //Steps
  //1.read request body
  const request_body = req.body
  //2.insert data in users collection in MongoDB
  const user_obj = {
    name: request_body.name,
    email: request_body.email,
    password: bcrypt.hashSync(request_body.password, 8)
  };
  //3. Return response back to user
  try {
    const usercreated = await userModel.create(user_obj);
    //return this user
    const usercreated2 = {
      name: usercreated.name,
      email: usercreated.email
    //   createdAt: usercreated.createdAt,
    //   updatedAt: usercreated.updatedAt,
    };

    res.status(201).send({
      message: "User created",
      usercreated2,
    }); //201 : something succesfully created
  } catch (err) {
    console.log("Error registering the user");
    res.status(500).send({
      //500 : internal server error
      message: "some error happened while registering user try again..",
    });
  }
};

/**
 * SIGN IN or LOGINFUNCTION
 */
//const generateToken = require("../utils/generateToken.js");
exports.signin = async (req, res) => {
  request_body = req.body;
  //Check if user id is present in the db or not
  const user = await userModel.findOne({email : request_body.email});
  if (user == null) {
    console.log("User email passed not found");
    return res.status(400).send({
      message: "User email is not valid !",
    });
  }
  //If user id is present check if password is matching or not
  const pass = bcrypt.compareSync(request_body.password, user.password);
  //                                ^sent by postman        ^already stored in db
  //bcrypt by means of "compareSync" #library of bcrypt this encrypts the request password and
  // then compares it with encrypted password in the db
  if (!pass) {
    console.log("Wrong password ");
    return res.status(400).send({
      message: "Wrong Password entered !",
    });
  }

  //Using json web token(jwt) we will create the access token with given ttl(time to live) and return

  const token = jwt.sign({ id: user.email }, "process.env.JWT_SECRET", {
    expiresIn: "15d", //120 seconds = 2 mins
  });
   res.cookie("jwt", token, {
     maxAge: 15 * 24 * 60 * 60 * 1000,
     httpOnly: true,
     sameSite: "strict",
   });
  /**
     * for creating a token we need to give 3 fields: 
     * 1. on basis of whom we have to generate token (here we took userID)
     * 2. any random string for more security
     * 3. Time of expiry
     * const token = jwt.sign({id : user.userID},"any secret string",{     
        expiresIn : 120 //120 seconds = 2 mins
        })
        we can write this secret string in config file also
     */
  res.status(200).send({
    message: "User logged in succesful !",
    userID: user._id,
    name: user.name,
    email: user.email,
    accessToken: token
  });
};
exports.logout = async(req,res)=>{
  try {
    res.cookie("jwt","",{maxAge: 0})
    res.status(200).json({message:"Logged out succesful"})
  } catch (error) {
    console.log("Error logging out")
  }
}