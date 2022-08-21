const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/blog", blogRoutes);
app.use("/", (req, res) => {
  res.send("hi we are here");
});
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
