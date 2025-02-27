/**
 * POST localhost
 */
const authMiddleware = require("../middleware/auth.middleware");
const authController = require("../controller/authController");

module.exports = (app) => {
  //Route for Sign Up
  app.post("/signup", [authMiddleware.verifySignUpBody], authController.signup);
  /**
   * if route enconters this ^ URI, then it makes a Post call at auth.controller and
   * tells signup to take place
   *
   * [authMiddleware.verifySignUpBody] this is a middle ware for checking the fields r properly given or not
   */
  //Route for Sign In
  app.post("/signin", [authMiddleware.verifySignInBody], authController.signin);

  app.post("/logout", authController.logout);
  /**
   * For sending message
   * 
   *   */
  
};

