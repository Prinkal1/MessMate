const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const pageRoutes = require("./routes/Pages");
const billRoutes = require("./routes/Bill");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

// routes
app.use("/auth", userRoutes);
app.use("/profile", profileRoutes);
app.use("/pages", pageRoutes);
app.use("/bill", billRoutes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})