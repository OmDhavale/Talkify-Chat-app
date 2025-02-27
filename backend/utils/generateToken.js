const jwt = require('jsonwebtoken')
const generateToken = (name,res)=>{
    const token =jwt.sign({name},process.env.JWT_SECRET,{
        expiresIn: "30d",
    })
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
    })
}
module.export = generateToken