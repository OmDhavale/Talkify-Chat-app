const userModel = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
/**
 * Create a middleware which checks if the request body is fine or not
 */

const verifySignUpBody = async (req, res, next) => {
  try {
    //Check for name,email,userID,password,userType
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed, name was not provided !",
      });
    }
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed, email was not provided !",
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        message: "Failed, password was not provided !",
      });
    }
    //check whether user with same email is present or not
    const flag = await userModel.findOne({name:req.body.name});
    if (flag) {
      return res.status(400).send({
        message: "User with same Email already present try again !",
      });
    }
    next();
  } catch (err) {
    console.log("Error while validating the request object", err);
    res.status(500).send({
      message: "Error while validating request body",
    });
  }
};

const verifySignInBody = (req, res, next) => {
  //if user id not present
  if (!req.body.email) {
    return res.status(400).send({
      message: "Email not provided !",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "Password not provided !",
    });
  }
  //updatedd this else line
  // else{
  //     return res.json("Success")
  // }
  next();
};

// const verifyToken = (req, res, next) => {
//   //Check if token is present in header
//   const token = req.headers["x-access-token"];
//   if (!token) {
//     return res.status(403).send({
//       message: "No token found : Unauthorised",
//     });
//   }
//   //check if its valid or not
//   jwt.verify(token, authConfig.secretString, async (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized : Session token expired !",
//       });
//     }
//     const user = await userModel.findOne({ name: decoded.id });
//     /**
//      * remember we created token using name, so after decoding token, we'll be
//      * getting userID only !, that we have to compare
//      */
//     if (user == null) {
//       return res.status(400).send({
//         message: "User for this token doesnt exists !",
//       });
//     }
//     //set user info in request body
//     req.user = user;
//     //if valid then move to next
//     next();
//   });
// };
// const isAdminCheck = (req, res, next) => {
//   const user = req.user;
//   if (req.user && user.userType == "ADMIN") {
//     next();
//   } else {
//     return res.status(403).send({
//       message: "FORBIDDEN : Only Admin is allowed to access this endpoint",
//     });
//   }
// };
module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  //verifyToken: verifyToken,
  //isAdminCheck: isAdminCheck,
};
