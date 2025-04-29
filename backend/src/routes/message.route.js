import express from "express";
import { protectroute  } from "../middlewares/auth.middelware.js";
import { getuserforsidebar , getmessages , sendmessage} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectroute , getuserforsidebar)

router.get("/:id", protectroute , getmessages)

router.post("/send:id", protectroute , sendmessage)


export default router;

