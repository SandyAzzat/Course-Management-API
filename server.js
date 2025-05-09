// Sandy Azzat
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db.config");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Server is running"));

app.use("/uploads", express.static("uploads"));

app.use("/api/courses", require("./routes/course.route"));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    connectDB()
        .then(() => {
        console.log("MongoDB connected successfully");
        })
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        });
});
