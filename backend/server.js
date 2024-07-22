import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.routes.js"
import mongoCon from "./db/mongoConnect.js";
import insertSampleData from "./db/createSamUser.js"
import dropCollections from "./db/dropColl.js";
import {generateLeaderboardsData,updateQuizScore} from "./db/gamificationLogic.js";
import { Topic, UserProfile } from "./models/user.model.js";
import callBackRoute from "./routes/callback.routes.js";



const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// const PORT = process.env.PORT;
const PORT = 5000;


app.use("/auth",authRoute);
app.use("/",callBackRoute);

app.get("/", (req, res) => {
    res.send("Backend server started");
});

app.get('/topics',async(req,res)=>{
    const topics=await Topic.find();
    console.log(topics);
    res.json(topics);
})

app.post("/formData",(req,res)=>{
    console.log(req.body);
    res.send("Successfully saved the data");
})

app.post("/userdata",async (req,res)=>{
    const userProfData=await UserProfile.findOne({email:'luckyfrog219@yahoo.com'}).exec();
    console.log(userProfData);
    res.json(userProfData);
});


app.post("/leaderboard",async(req,res)=>{
    const data=await generateLeaderboardsData();
    // console.log(data);
    res.json(data);
})


// stage clearance last level 240+
// 


app.listen(PORT, async () => {
    mongoCon();
    // dropCollections();
    // let bendData={  
     
    //     "user_name": "LuckyFrog219",
    //     "attempt_date": 1559632348,
    //     "user_obtained_marks": 130,
    //     "user_Email": "luckyfrog219@yahoo.com",
    //     "quiz_id": 17,
    //     "total_marks" : "10",
    //     "attempt_date" : 1559632348,
    //     "user_percent_marks" : "50",
    //     "time_taken_in_sec" : 3910,

    // }
    // // insertSampleData();
    // let fendData={topic:'History',level:1}

    // let userData={fendData:fendData,bendData:bendData};

    // update_data(userData);




    // update_data(userData);
    
    // const userData={
    //     fendData: { topic: 'Phishing', level: 1, username: 'user10@user10.com' },
    //     bendData: {
    //       user_Email: 'user10@user10.com',
    //       quiz_id: '4014848',
    //       user_obtained_marks: 66.67,
    //       total_marks: '100',
    //       user_percent_marks: '66.67',
    //       time_taken_in_sec: 23
    //     }
    //   }

    // await updateQuizScore(userData);

    console.log("App started running on server ",PORT);

    
});
