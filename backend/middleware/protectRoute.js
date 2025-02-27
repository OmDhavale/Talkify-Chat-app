const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(101).send({message:"Unauthorised"})
        }
        jwt.verify(token,"process.env.JWT_SECRET", async (err,decoded)=>{
            if (!decoded) {
              return res.status(101).send({ message: "Invalid token" });
            }

            const user = await User.findOne({ email: decoded.id });

            if (!user) {
              return res.status(404).send({ message: "User not found" });
            }

            req.user = user;

            next();
        })
        
    } catch (error) {
        console.log("Error in protectRoute middleware")
        res.status(500).send({message:"Internal server error"})
    }
}

module.exports = {
    protectRoute : protectRoute
}