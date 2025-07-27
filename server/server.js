const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const initRoutes = require("./routes");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8888;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); // Kiểm tra CORS để frontend truy cập tài nguyên của backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dbConnect();
initRoutes(app);
app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
