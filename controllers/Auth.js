import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




//register a user 
export const register = async(req, res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
        const existUser = await User.findOne({email: email})
        if(existUser) return res.status(400).json({message: "email is already register.."})

        //pass
        const salt = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPass,
        })
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}


//login controllers
export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({message: "User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return  res.status(400).json({message: "Invalid crential "});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});

    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

//retrive user from userName

export const findUser = async (req, res)=>{
    try {
        const {userName} = req.params;
        const findUserName = await User.findOne({userName:userName});
        
        if(!findUserName){
            res.status(402).json({message: "user is not exist ..."})
        }

        delete findUserName.password;
        res.status(200).json(findUserName)

    } catch (error) {
        res.status(404).json({error: error.message});
    }
}


//find followers list form db
export const findFollowers = async (req, res)=>{
    try {
        const {userName} = req.params;
        const findUserName = await User.findOne({userName:userName});

        if(!findUserName){
            res.status(402).json({message: "userName not found"})
        }

        const userFollowers = await Promise.all(
            findUserName.followers.map((id)=>{
                User.findById(id);
            })
        )

        res.status(200).json(userFollowers);


    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

////find following list form db
export const findFollowing = async (req, res)=>{
    try {
        const {userName} = req.params;
        const findUserName = await User.findOne({userName:userName});

        if(!findUserName){
            res.status(402).json({message: "userName not found"})
        }

        const userFollowing = await Promise.all(
            findUserName.follow.map((id)=>{
                User.findById(id);
            })
        )

        res.status(200).json(userFollowing)
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

//add and remove followers

export const addRemoveFollow = async(req, res)=>{
    try {
        const {userName} = req.params;
        const findUserName = await User.findOne({userName:userName});

        if(findUserName.follow.includes(userName)){
            findUserName.follow = findUserName.follow.filter((id)=> id !== userName)
            await findUserName.save();
            res.status(200).json({message: "new followers added"})
        }else{
            findUserName.follow.push(userName)
            await findUserName.save();
            res.status(200).json({message: "followers remove"})
        }
         res.status(200).json({findUserName})

    } catch (error) {
        res.status(404).json({error: error.message});
    }
}