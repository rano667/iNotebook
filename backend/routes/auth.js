const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

const JWT_Secret = "ranjanMOndal";

//Route 1: create a User using: POST "/api/auth/createuser". no login require

router.post(
  "/createuser",
  [
    //Validation
    body("name", "Enter an valid name(>3)").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Minimum 5 characters required").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with the email already exist" });
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // .then(user => res.json(user)).catch(err=>{console.log(err);
      //     res.json({error: 'Enter an unique Email',
      // message: err.message})});
      // res.json({user});
      const token = jwt.sign({ id: user.id }, JWT_Secret);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    //Validation
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring to get email and password
    const { email, password } = req.body;
    //We will try to find and get the user
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with Correct Credential" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with Correct Credential" });
      }
      //if the password is correct we will send the payload
      const token = jwt.sign({ id: user.id }, JWT_Secret);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server Error");
    }
  }
);

//Route 3: Get login user details using: POST "/api/auth/getuser". Login Required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server Error");
  }
});
module.exports = router;
