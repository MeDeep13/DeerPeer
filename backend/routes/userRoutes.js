const express= require('express');
const router= express.Router();
const {registerUser, loginUser, makeAdmin, getAllUsers, currentUser}= require("../controller/userController");
const adminOnly= require('../middleware/admin.js');
const {validateToken} = require('../middleware/validTokenHandler.js');
const {NotLoggedIn}= require("../middleware/NotLoggedIn.js");

// register
// need to verify that no logged in user can create a new user
router.route('/register').post(NotLoggedIn, registerUser);

//login
router.route('/login').post(loginUser);

//current
router.route('/current').get(validateToken, currentUser);


// make user admin
router.route('/make-admin/:id').put(makeAdmin);

// all users
router.use(validateToken);
router.use(adminOnly); // iske aage access k liye user must be admin himself
router.route('/allusers').get(getAllUsers);

// wrong route
router.use(
    (req,res)=>{
        res.status(404).json({message: 'No such route or CRUD operation exists!'});
    }
)

module.exports= router;
