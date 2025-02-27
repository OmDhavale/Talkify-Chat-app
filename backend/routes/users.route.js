const getUsers = require("../controller/getuser.controller")
const protectRoute = require("../middleware/protectRoute");

module.exports = (app)=> {
    
    //app.get("/get/users", [protectRoute.protectRoute], getUsers.getUsersForSidebar);
    app.get("/get/users", getUsers.getUsersForSidebar);
}