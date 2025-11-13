const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        required: [true, "Please insert your college email address"],
        unique: [true, "Email address already taken!"]
    },
    password:{
        type: String,
        required: [true, "Please add a password!"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{timestamps: true});

module.exports= mongoose.model('User', userSchema);