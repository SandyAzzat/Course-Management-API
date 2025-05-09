const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db.config");
const serverless = require("serverless-http");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello , Server is running"));

app.use("/uploads", express.static("uploads"));

app.use("/api/courses", require("./routes/course.route"));


connectDB().catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});

module.exports = app;
module.exports.handler = serverless(app);




// connectDB()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server running at http://localhost:${PORT}/`);
//         });
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
// });
