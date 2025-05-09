const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected to database: ${dbConnection.connection.name}`);
        mongoose.connection.once("open",()=>{console.log("MongoDB connection is open");});
        mongoose.connection.on("reconnected", () => {console.log("MongoDB reconnected");});
    }catch(error){
        console.error("Error connecting to MongoDB:", error.message);
    };
    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
    });
    mongoose.connection.on("disconnected", () => {console.warn("MongoDB disconnected");});
}

module.exports = connectDB;
