import express from "express";
import {callBackPost} from  "../controllers/callback.controllers.js"


const router=express.Router();

router.post("/callback/",callBackPost);



export default router;