import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import { Topic, UserProfile, UserScore } from "../models/user.model.js";
import update_data from "../db/gamificationLogic.js";

const app = express();

// dotenv.config();
app.use(cors());
app.use(express.json());



const topics=Topic.find().exec();
const processedResultIds = new Set();

let callbackDataBody = {

    "token": "Your Notification Token",

    "result_id": "206370034",

    "user_name": "ProProfs",

    "total_marks": "100",

    "attempt_date": 1559632348,

    "user_obtained_marks": 65,

    "user_percent_marks": "50",

    "user_totalcorrect_answers": 1,

    "user_totalwrong_answers": 1,

    "user_Id": "",

    "user_Email": "someone@example.com",

    "user_Address": "",

    "user_City": "",

    "user_State": "",

    "user_Zipcode": "",

    "user_Country": "",
    "time_taken": "01:05:10",
    "time_taken_in_sec": 3910,
    "user_total_unanswered": 0,

    "user_Phone": "",

    "quiz_id": "2478348",

    "quiz_name": "API Test",

    "quiz_title": "mjq3odu5nqo7iv",

    "min_pass_marks": "70",


    "tag_based_score": [

        {

            "tag": "Maths",

            "score": "5 / 5"

        }, {

            "tag": "Physics",

            "score": "0 / 5"

        }

    ],

    "custom_ques_ans": [

        {

            "question": "How did you find us?",

            "answer": "Search Engine"

        }, {

            "question": "How do you commute?",

            "answer": "Car"

        }

    ],

    "status": "new"

};



const callBackPost= async (req, res) => { 
    const resultId = req.body.result_id;
    if (!resultId) {
        return res.status(400).json({ message: "result_id is required" });
    }
    if (processedResultIds.has(resultId)) {
        console.log(`Duplicate callback data received for result_id: ${resultId}`);
        return res.status(200).json({ message: "Duplicate data ignored", resultId });
    }
    // callbackData={k1:"val1",k2:"val2",points: Math.floor(Math.random() * 100) };
    // console.log('callback data',req.body);
    const callbackDataBody=req.body;
    
    try{
        const bendData={  
            
            user_Email:callbackDataBody.user_Email,
            quiz_id:callbackDataBody.quiz_id,
            user_obtained_marks:callbackDataBody.user_obtained_marks,
            total_marks:callbackDataBody.total_marks,
            user_percent_marks:callbackDataBody.user_percent_marks,
            time_taken_in_sec: callbackDataBody.time_taken_in_sec
        }
        
        // console.log(bendData);

        const mtopic=await Topic.find({'levels.quizId':callbackDataBody.quiz_id});
        console.log('topic name is ',mtopic[0]?.topicName);
        const userProfData=await UserProfile.find({email:callbackDataBody.user_Email});
        // console.log(userProfData);
        
        
        // Use topicName and currentLevel variables as needed
        
        const fendData={
            topic:mtopic[0]?.topicName,
            level:userProfData[0].currentLevel,
            username:userProfData[0].username
        }
        let userData={fendData:fendData,bendData:bendData};
        console.log(userData)
        update_data(userData);
    }catch(err){
        console.log("User Data not updated",err);
    }
    
    res.json({message: "Data received", bodyData: callbackDataBody});
}



export {callBackPost};