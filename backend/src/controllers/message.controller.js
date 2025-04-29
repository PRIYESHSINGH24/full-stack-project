import user from "../models/user.model.js";
import message from "../models/message.model.js";

export const getuserforsidebar = async (req , res) => {
    try {
        const loggedinuserid = req.user._id;
        const filteredusers = await user.find({_id: {$ne:loggedinuserid}}).select("-password");
        res.status(200).json(filterusers)
        
    } catch (error) {
        console.error("error in getusersforsidebar: ", error.message);
        res.status(500).json({
            error: "internal server error"
        })
        
    }
}


export const getmessages = async (req, res) => {
    try {
        const { id:userctochatid } = req.params
        const myid = req.user._id
        const senderid = req.user._id;

        const message = await message.find({
            $or:[
                {senderid:myid , receiverid: usertochatid},
                {senderid: usertochatid, receiverid:myid}
            ]
        }) 
        res.status(200).json(message)
    } catch (error) {
        console.log("error in getmessage controller: ", error.message);
            res.status(500).json({error: "internal server error" })
        
        
    }
}

export const sendmessage = async (req, res) => {
    try {
        const { text , image } = req.body;
        const { id: receiverid} = req.params;
        const senderid = req.user._id;

        let imageurl;
        if (image) {
            const uploadresponse = await cloudinary.uploader.upload(image);
            imageurl = uploadresponse.secure_url;

        
        }
        const newmessage = new message ({
            senderid,
            receiverid,
            text, image: imageurl,
        })


        await newmessage.save();


        res.status(201).json(newmessage)
        
    } catch (error) {
    console.log("error in sendmessage controller: ", error.message);
    res.status(500).json({error: "internal server error" })
    }
}