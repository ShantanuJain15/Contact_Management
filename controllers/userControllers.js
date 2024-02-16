const asyncHandler =require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser =asyncHandler( async (req, res) => {
    console.log("Login User");
    res.status(200).json("login");
});


//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser =asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400)
        throw new Error("user alerady registered!");
    }
      //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);

    res.status(200).json("register");
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });
  


module.exports ={loginUser,registerUser,currentUser};