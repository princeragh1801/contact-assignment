import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

export const connectDB = async()=>{
    try {
        const connectionString = `${process.env.MONGODB_URL}/${DB_NAME}`;
        console.log("Connection string :: ", connectionString)
        const dbConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("Mongodb is connected on ", dbConnectionInstance.connection.host)
    } catch (error) {
        console.error("Error while connecting to database")
        process.exit(1);
    }
}