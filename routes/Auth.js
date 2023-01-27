import express from "express";
import { login, register, findUser,findFollowers, findFollowing, addRemoveFollow } from "../controllers/Auth.js";
import { verifyToken } from "../middleware/Auth.js";



const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/user/:userName",verifyToken, findUser );

// GET:/users/:username/followers: Retrieve a list of followers for a specific user
router.get("/users/:userName/followers",verifyToken, findFollowers)


//GET /users/:username/following: Retrieve a list of users a specific user is following
router.get("/users/:userName/following",verifyToken, findFollowing)

//POST /users/:username/follow: Follow a specific user
//DELETE /users/:username/follow: Unfollow a specific user
//Add and remove follows in one APIs

router.patch("/users/:username/follow", verifyToken, addRemoveFollow)


export default router;