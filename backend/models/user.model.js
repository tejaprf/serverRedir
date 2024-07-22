import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Users schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String },
    school: { type: String},
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);



//User profile schema
const userProfileSchema = new Schema({
    email: { type: String, unique: true }, // Reference to the user
    username:{type:String, required:true},
    currentLevel: { type: Number,required:true}, // Reference to the current level of the user
    stageCleared:{type:Boolean,required:true},
    topics: [{
        topicName: { type: String},
        gemEarned: {type:Boolean},
        levels: [{
            levelId: { type: Number},
            quizId:{type:Number},
            score:{type:Number},
        }]
    }],
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);




// Themes schema
const topicSchema = new Schema({
    topicName: { type: String, required: true ,unique:true},
    description: { type: String },
    levels: [{
        levelId: {type:Number},
        quizId:{ type: Number},
        quizUrl:{type:String, required:true}
    }]
    
});

const Topic = mongoose.model('Topic', topicSchema);



// UserScores schema
const userScoreSchema = new Schema({
    email: { type: String, required: true },
    quizId: { type: Number, required: true },
    username:{type:String,required:true},
    score: { type: Number, required: true },
    totalMarks:{type:Number,required:true},
    percentageMarks:{type:Number,required:true},
    timeSec:{type:Number,required:true},
    completedAt: { type: Date, default: Date.now }
});

// Define a compound index on 'email' and 'quizId' fields
userScoreSchema.index({ email: 1, quizId: 1 }, { unique: true });

const UserScore = mongoose.model('UserScore', userScoreSchema);

// Leaderboards schema
const leaderboardSchema = new Schema({
    email: { type: String, required: true,unique:true },
    username:{type:String, required:true},
    totalScore: { type: Number, required: true },
    rank: { type: Number }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Exporting the models
export {User,Topic,UserProfile,UserScore,Leaderboard};
