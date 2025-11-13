const asyncHandler = require('express-async-handler');
const User= require("../modals/userSchema");
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

//@desc register the user
//@route Post /api/users/register
//@access public

const registerUser= asyncHandler (
    async (req,res)=>{
        const {username, email, password}= req.body;
        if(!username || !email || !password){
            res.status(400);
            throw new Error ("All the fields are mandatory!");
        }
        // checking if user already exists
        const userAvailable= await  User.findOne({email});// passing email as an oject
        if(userAvailable){
            res.status(400);
            throw new Error("User already registered");
        }
        // hashing password
        const hashed_password= await bcrypt.hash(password, 10);
        const user= await User.create({username, email, password:hashed_password});
        console.log(`User created ${user.email}`);

        if(user){
            res.status(201).json({_id: user.id, email: user.email});
        }else{
            res.status(400);
            throw new Error("User data is not valid");
        }
    }
);

//@desc login into existing user
//@route Post /api/users/login
//@access public

const loginUser= async (req,res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user= await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        // need to give an access token now
        const accessToken= jwt.sign({
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                //id: user.id,
                role: user.role
            }
        }, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "1d"});
        res.status(200).json({message: "Login was successful", accessToken, userId: user._id});
    }else{
        return res.status(400).json({message: "Invalid email or password!"});
        //throw new Error("Invalid email or password!");
    }
};

//desc make the user admin
// routes put
// access private

const makeAdmin= asyncHandler (
    async(req, res)=>{
        const user= await User.findByIdAndUpdate(
            req.params.id,
            {role: 'admin'},
            {new: true}
        );
    
        if(!user) return res.status(404).json({message: "User not found :("});

        res.json({message: `${user.username} is now an admin!`, user});
    }
)

//desc current user
//route get /api/users/current
//access private
const currentUser= asyncHandler (
    async(req,res)=>{ // this can only be done when some middleware has identified the user and attach to the
    //user, here the middleware will be jwt
    const userId= req.user.id
    const user= await User.findById(userId);
    if(user){
        res.status(200).json({Id: user.id, username: user.username, role: user.role});
    }else{
        res.status(404).json({message: "No user :("})
    }
}
);

//desc get all users
//routes Get /api/users/allusers
//access admin only

const getAllUsers= asyncHandler (
    async (req,res)=>{
        const allUsers= await User.find();
        res.status(200).json({allUsers});
    }
)

module.exports= {registerUser, loginUser, makeAdmin, getAllUsers, currentUser};