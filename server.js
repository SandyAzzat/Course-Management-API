const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config");
const courseRoutes = require("./routes/course.route");

const PORT = 4000;

const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => res.send("Server is running via Vercel!"));

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
});
