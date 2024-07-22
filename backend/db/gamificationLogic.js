import mongoose, { mongo } from "mongoose";
import { User, UserProfile, UserScore ,Topic} from "../models/user.model.js";
// // Assuming updated data for the user

// const userData={  



//    "user_name" : "CleverLion685",

//    "attempt_date" : 1559632348,

//    "user_obtained_marks" : 503,


//    "user_Email" : "cleverlion685@yahoo.com",


//    "quiz_id" : 67

// }




// const updateCurrentLevel = (userData) => {

//     UserProfile.updateOne(
//         { 'topics.levels.quizId': userData.quiz_id }, // Match documents where quizId equals givenQuizId
//         { $set: { 'topics.$[topic].levels.$[level].score': userData.user_obtained_marks } }, // Update the score field
//         { arrayFilters: [{ 'topic.levels.quizId': userData.quiz_id }, { 'level.quizId': userData.quiz_id }] } // Array filters to identify the specific nested array elements
//       )
//         .then((result) => {
//           console.log('Updated successfully:', result);
//         })
//         .catch((error) => {
//           console.error('Error updating:', error);
//         });
    
//     // Update only specific fields of the user in the database
    
    
    
//     // For demonstration purposes, console.log is used to show the updated current level's total score
//     // console.log(`Updated total score for current level ${currentLevel}: ${totalScore}`);
// };

// const unlockNextLevel = (userData) => {
//     // Get the user's current level
//     const userProfData=UserProfile.findOne({email:userData.user_Email});
    
//     // Get the user's current level
//     const currentLevel = userProfData.currentLevel;
    
//     // Calculate total score for the current level
//     let totalScore = 0;
//     userProfData.topics.forEach((topic) => {
//         topic.levels.forEach((level) => {
//             if (level.levelId === currentLevel) {
//                 totalScore += level.score;
//             }
//         });
//     });
    
//     const totalPossibleScore = userProfData.topics.length * 100;
//     if ((currentLevel.totalScore / totalPossibleScore) * 100 >= 60) {
//       // Unlock next level
//       const nextLevel = currentLevel + 1;
//       console.log(`Unlock next level ${nextLevel}`);
//     }


//     User.findByIdAndUpdate(userData.user_Email, { $set: {currentLevel:nextLevel} }, { new: true })
//       .then((userData) => {
//         console.log('User updated successfully:', userData);
//       })
//       .catch((error) => {
//         console.error('Error updating user:', error);
//       });
    
//     // Calculate total possible score for the current level
  
//     // Check if the total score of the current level is >= 60% of the total possible score
//   };
  
//   const awardGem = (userProfData) => {
//     // Iterate through topics and levels
//     userProfData.topics.forEach((topic) => {
//       topic.levels.forEach((level) => {
//         // Check if the user's score for the current level is >= 70
//         if (level.score >= 70) {
//           // Award gem for the topic
//           // For demonstration purposes, console.log is used to show the awarded gem
//           console.log(`Award gem for topic ${topic.topicName}`);
//           // Update user data to reflect gem earned
//         }
//       });
//     });
//   };
  
//   // Call the functions with the user data to apply the gamification logic
//   updateCurrentLevel(userData);
//   unlockNextLevel(userData);
//   awardGem(userData);
  



// const userData = {  
//   "user_name": "LuckyFrog219",
//   "attempt_date": 1559632348,
//   "user_obtained_marks": 503,
//   "user_Email": "luckyfrog219@yahoo.com",
//   "quiz_id": 17
// };

const updateQuizScore = async (userData) => {
    try{
    
    const temp=await UserProfile.findOne({email:userData.bendData.user_Email,'topics.levels.quizId': userData.bendData.quiz_id, 'topics.topicName':userData.fendData.topic});
    console.log('Updating the quiz score. Checking if data exists ',temp);
    if(temp!==null){
        console.log("Data already exists");
    UserProfile.updateOne(
        { email:userData.bendData.user_Email,'topics.levels.quizId': userData.bendData.quiz_id,'topics.topicName':userData.fendData.topic}, // Match documents where quizId equals givenQuizId
        { $set: { 'topics.$[topic].levels.$[level].score': userData.bendData.user_obtained_marks } }, // Update the score field
        { arrayFilters: [{ 'topic.levels.quizId': userData.bendData.quiz_id }, { 'level.quizId': userData.bendData.quiz_id }] } // Array filters to identify the specific nested array elements
      )
        .then((result) => {
          console.log('Updated successfully:', result);
        })
        .catch((error) => {
          console.error('Error updating:', error);
        });

     }else {
        // await UserProfile.push(
        //     {email:userData.bendData.user_Email, 'topics.topicName':userData.fendData.topic},
        //     {levelId:}
        // )
        console.log("Entered updating condition");
        const newData={levelId:userData.fendData.level,quizId:userData.bendData.quiz_id,score:userData.bendData.user_obtained_marks};
        console.log(newData);
        await UserProfile.findOne({email:userData.bendData.user_Email}).then((userProfile)=>{
            userProfile.topics.forEach((topic)=>{
                if(topic.topicName===userData.fendData.topic)
                {
                    topic.levels.push(newData);
                }
            })
            userProfile.save();
        })
     }

     const filter = {
      email: userData.bendData.user_Email,
      quizId: userData.bendData.quiz_id
    };
    
    const update = {
      $set: {
        username: userData.fendData.username,
        score: userData.bendData.user_obtained_marks,
        totalMarks: userData.bendData.total_marks,
        percentageMarks: userData.bendData.user_percentage_marks,
        timeSec: userData.bendData.time_taken_in_sec,
        completedAt: new Date()
      }
    };
    
    const options = {
      new: true, // return the updated document
      upsert: true // create a new document if it doesn't exist
    };
    
    const updatedUserScore = await UserScore.findOneAndUpdate(filter, update, options);
    
    console.log(updatedUserScore);
    

    
  }catch(err)
  {
    console.log("Current level not updated",err);
  }
};

const unlockNextLevel = async (userData) => {
  try {
    const userProfData = await UserProfile.findOne({ email: userData.bendData.user_Email }).exec();
    const currentLevel = userProfData.currentLevel;
    const topic=await Topic.findOne();
    const maxLevel=topic.levels.length;


    if(userData.fendData.level===currentLevel){

        let totalScore = 0;
        userProfData.topics.forEach((topic) => {
          topic.levels.forEach((level) => {
            if (level.levelId === currentLevel) {
              totalScore += level.score;
              
            }
          });
        });
        const totalPossibleScore = userProfData.topics.length * 100;
        if ((totalScore / totalPossibleScore) * 100 >= 60) {

          const nextLevel = currentLevel + 1;
          console.log(`Unlock next level ${nextLevel}`);
          
          if(maxLevel===currentLevel)
          console.log('Max level reached..')
          else{
            await UserProfile.findByIdAndUpdate(userProfData._id, { currentLevel: nextLevel });
            console.log('User updated successfully');
          }
        }
    }
  } catch (error) {
    console.error('Error unlocking next level:', error);
  }
};



const awardGem = async (userData) => {
    console.log(userData);
    try {
        if (userData.bendData.user_obtained_marks >= 70) {
        UserProfile.updateOne(
            {email:userData.bendData.user_Email, 'topics.topicName': userData.fendData.topic },
            { $set: { 'topics.$.gemEarned': true } }
        ).then((result) => {
            console.log(`Topic ${userData.fendData.topic }`);
        }).catch((error) => {
            console.error('Error updating gem:', error);
        });
        }else {

            // UserProfile.updateOne(
            //     {email:userData.bendData.user_Email, 'topics.topicName': userData.fendData.topic },
            //     { $set: { 'topics.$.gemEarned': false } }
            // ).then((result) => {
            //     console.log(`Topic ${userData.fendData.topic }`);
            // }).catch((error) => {
            //     console.error('Error updating gem:', error);
            // });

            let gemEarned = false; // Initialize gemEarned to false

            const userProf=await UserProfile.find({email:userData.bendData.user_Email})

            userProf.topics.forEach(topic => {
                if (topic.topicName === userData.fendData.topic) {
                    topic.levels.forEach(level => {
                        if (level.score >= 70) {
                            gemEarned = true; // Set gemEarned to true if any score is >= 70
                        }
                    });
        
                    // Update gemEarned for the topic
                    UserProfile.updateOne(
                        { email: userData.bendData.user_Email, 'topics.topicName': userData.fendData.topic },
                        { $set: { 'topics.$.gemEarned': gemEarned } }
                    ).then((result) => {
                        console.log(`Topic ${userData.fendData.topic} gem earned: ${gemEarned}`);
                    }).catch((error) => {
                        console.error('Error updating gem:', error);
                    });
                }
            });





            }

    } catch (error) {
      console.error('Error finding user:', error);
    }
  };
  




const generateLeaderboardsData = async () => {
  try {
      // const curDate = new Date(); // Get the current date
      // console.log("Current Date:", curDate);

      // // Weekly Date Range
      // const startOfWeek = new Date(curDate);
      // startOfWeek.setHours(0, 0, 0, 0 - startOfWeek.getDay()); // Set to the beginning of the week
      // console.log("Start of Week:", startOfWeek);
      // const endOfWeek = new Date(curDate);
      // endOfWeek.setHours(23, 59, 59, 999 - endOfWeek.getDay()); // Set to the end of the week
      // console.log("End of Week:", endOfWeek);

      // // Monthly Date Range
      // const startOfMonth = new Date(curDate);
      // startOfMonth.setDate(1); // Set to the beginning of the month
      // startOfMonth.setHours(0, 0, 0, 0);
      // console.log("Start of Month:", startOfMonth);
      // const endOfMonth = new Date(startOfMonth);
      // endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Set to the end of the month
      // endOfMonth.setDate(0); // Get the last day of the month
      // endOfMonth.setHours(23, 59, 59, 999);
      // console.log("End of Month:", endOfMonth);

      const curDate = new Date(); // Get the current date
console.log("Current Date:", curDate);

// Start of Last Month
const startOfLastMonth = new Date(curDate);
startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1); // Set to the last month
startOfLastMonth.setDate(1); // Set to the first day of the last month
startOfLastMonth.setHours(0, 0, 0, 0); // Set to start of day
console.log("Start of Last Month:", startOfLastMonth);

// End of Last Month
const endOfLastMonth = new Date(startOfLastMonth);
endOfLastMonth.setMonth(endOfLastMonth.getMonth() + 1); // Set to the end of the last month
endOfLastMonth.setDate(0); // Get the last day of the last month
endOfLastMonth.setHours(23, 59, 59, 999); // Set to end of day
console.log("End of Last Month:", endOfLastMonth);

// Start of Last Week
const startOfLastWeek = new Date(curDate);
startOfLastWeek.setDate(startOfLastWeek.getDate() - startOfLastWeek.getDay() - 7); // Set to the start of the last week
startOfLastWeek.setHours(0, 0, 0, 0); // Set to start of day
console.log("Start of Last Week:", startOfLastWeek);

// End of Last Week
const endOfLastWeek = new Date(startOfLastWeek);
endOfLastWeek.setDate(endOfLastWeek.getDate() + 6); // Set to the end of the last week
endOfLastWeek.setHours(23, 59, 59, 999); // Set to end of day
console.log("End of Last Week:", endOfLastWeek);

      // Aggregate weekly scores
      const userTotalScoresWeek = await UserScore.aggregate([
          {
              $match: {
                  completedAt: { $gte: startOfLastWeek.toISOString(), $lte: endOfLastWeek.toISOString() }
              }
          },
          {
              $group: {
                  _id: {username:'$username'},
                  totalScore: { $sum: "$score" }
              }
          },
          {
              $sort: { totalScore: -1 }
          },
          {
              $limit: 3
          }
      ]);

      // Aggregate monthly scores// Aggregate monthly scores
const userTotalScoresMonth = await UserScore.aggregate([
  {
    $match: {
      completedAt: {
        $gte: startOfLastMonth.toISOString(),
        $lt: endOfLastMonth.toISOString()
      }
    }
  },
  {
    $group: {
      _id: { username: '$username' },
      totalScore: { $sum: '$score' }
    }
  },
  {
    $sort: { totalScore: -1 }
  },
  {
    $limit: 3
  }
]);

      // const uscores=await UserScore.find({completedAt:2024-05-11T10:38:02.864Z});
      // const uscores=await UserScore.find({
      //   completedAt:{
      //     $gte: "2024-02-02",
      //     $lte: "2024-06-02" 
      //   }
      // })
      // console.log(uscores);
      

      // Aggregate all-time top scores
      const userTotalScoresNoFilter = await UserScore.aggregate([
          {
              $group: {
                  _id: {username:'$username'},
                  totalScore: { $sum: "$score" }
              }
          },
          {
              $sort: { totalScore: -1 }
          },
          {
              $limit: 3
          }
      ]);

      // console.log('userTotalScoresWeek: ', userTotalScoresWeek);
      // console.log('userTotalScoresMonth: ',userTotalScoresMonth);
      // console.log('userTotalScoresNoFilter',userTotalScoresNoFilter);

      // console.log(userTotalScoresWeek,userTotalScoresMonth,userTotalScoresNoFilter);
      return { weekly: userTotalScoresWeek, monthly: userTotalScoresMonth, allTime: userTotalScoresNoFilter };
  } catch (error) {
      console.error("Error generating leaderboard data:", error);
      throw error; // Rethrow the error to handle it at a higher level
  }
};






const update_data=async (userData)=>{    
    await updateQuizScore(userData);
    await unlockNextLevel(userData);
    await awardGem(userData);
    // await generateLeaderboardsData();
    
}

// update_data();
export default update_data;
export {generateLeaderboardsData,updateQuizScore};