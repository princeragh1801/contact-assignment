import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const startServer = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB");

        app.listen(8000, () => {
            console.log("Server is running at port: 8000");
        });
    } catch (error) {
        console.error("MongoDB connection failed!", error);
        process.exit(1);  // Exit the process if MongoDB connection fails
    }
};

// Handle server errors
app.on("error", (error) => {
    console.error("Error while connecting to server", error);
});

// Start the server
startServer();
