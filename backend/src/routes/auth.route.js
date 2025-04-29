import express from "express";
import { login , signup , logout , checkauth } from "../controllers/auth.controller.js"
import {protectroute} from "../middlewares/auth.middelware.js"
import {updateprofile} from "../controllers/auth.controller.js"



const router = express.Router()

router.post("/signup", signup);


router.post("/login", login);


router.post("/logout", logout);

router.put("/update-profile" , protectroute , updateprofile )

router.get("/check", protectroute , checkauth)


export default router;