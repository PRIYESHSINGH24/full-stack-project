import jwt from "jsonwebtoken"
import user from "../models/user.model.js";


export const protectroute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Token:", token);
        
        if (!token){
            return res.status(401).json({message : "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.jwt_secret)
        console.log("Decoded token:", decoded);
        
        if  (!decoded){
            return res.status(401).json({message : "Unauthorized"})
        }

        const foundUser = await user.findById(decoded.id).select("-password");
        console.log("Found user:", foundUser);
        
        if (!foundUser){
            return res.status(404).json({message : "User not found"})
        }

        req.user = foundUser
        next()
        
    } catch (error) {
        console.log("Error in protectroute:", error)
        return res.status(500).json({message : "Unauthorized"})
    }
}


    
