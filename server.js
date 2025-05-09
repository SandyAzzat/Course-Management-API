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

connectDB();

app.listen(PORT, () => {
    console.log("Server is running on 4000");
});
