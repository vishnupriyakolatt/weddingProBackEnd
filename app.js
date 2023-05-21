const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRouter");
const superadminRoutes = require("./routes/superadminRouter");
const userRoutes = require("./routes/userRouter");

const cookieParser = require("cookie-parser");
const path = require("path");
const dbconnect = require("./config/conn");

const PORT = process.env.PORT || 8080;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
dbconnect.dbconnect();

app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname + "public")));

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.CORS],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use("/api/superadmin", superadminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);


// app.use("/superadmin", superadminRoutes);
// app.use("/admin", adminRoutes);
// app.use("/", userRoutes);
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT} `);
});
