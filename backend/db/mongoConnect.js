import mongoose from "mongoose";

const mongoCon=async () =>{
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log("Connected to mongoDB",process.env.mongoUrlProd);
    } catch (error) {
        console.log("Connection to DB failed",error.message);
    }
}

export default mongoCon;