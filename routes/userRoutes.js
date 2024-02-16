const express = require('express')

const router =express.Router();
const {registerUser,loginUser,currentUser} = require('../controllers/userControllers');
// router.route('/').get((req,res)=>{
//     res.json("success homepage");
// })

router.route('/login').post(loginUser);

router.post('/register',registerUser);

router.route('/current').get((req,res)=>{
    res.json({"Register":"success homepage"});
})

module.exports = router;