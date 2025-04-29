import bcrypt from "bcryptjs";
import user from "../models/user.model.js";
import { generatetoken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        generatetoken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            profilepic: newUser.profilepic,
        });

    } catch (error) {
        console.log("Signup Error:", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generatetoken(existingUser._id, res);

        res.status(200).json({
            _id: existingUser._id,
            fullname: existingUser.fullname,
            email: existingUser.email,
            profilepic: existingUser.profilepic,
        });

    } catch (error) {
        console.log("Login Error:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Logout Error:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateprofile = async (req, res) => {
    try {
        const {profilepic} = req.body;
        const userid = req.user._id;

        if (!profilepic) {
            return res.status(400).json({
                message: "Profile pic is required"
            });
           const uploadresponse =  await cloudinary.uploader.upload(profilepic)
           const updateduser = await user.findByIdAndUpdate(userid , {profilepic:uploadresponse.secure_url}, {new:true}
           )
        }

    } catch (error) {

        console.log("error in the update picture uploading ")
        res.status(500).json({
            message : "internal server error"  
        })
    }
};


export const checkauth = (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilepic: user.profilepic,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
        
    } catch (error) {
        console.log("error in the checkauth", error.message);
        res.status(500).json({
            message: "internal server error"
        })
    }
}