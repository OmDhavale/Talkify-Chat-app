const User = require("../model/userModel")
exports.getUsersForSidebar = async (req,res)=>{
    try {
        // const loggedInUserId = req.user._id
        
        const filteredUsers = await User.find() //all users except logged in user

        res.status(200).send(filteredUsers)


    } catch (error) {
        console.log("Error in getting user")
        console.log(error)
        res.status(500).send({message:"Internal server error user"})
    }
}