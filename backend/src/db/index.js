import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"


const connectDB = async () => {
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log("\n mongodb connected || DB Host:",connectionInstance.connection.host)
    } catch (error) {
        console.log("MongoDB connected failed",error);
        process.exit(1)
    }
}


export default connectDB