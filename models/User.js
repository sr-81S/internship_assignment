import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    followers:{
        type:Array,
        default:[],
    },
    follow:{
        type: Array,
        default: [],
    },
    password:{
        type: String,
        required: true,
        unique: true,
    }
},{timestamps: true});

const User = mongoose.model("User",userSchema)

export default User;