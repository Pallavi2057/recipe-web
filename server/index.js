const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const config = require("./db/config");
const Home = require("./controllers/controller");
const LoginRoute = require("./routes/LoginRoute");
const RegisterRoute = require("./routes/RegisterRoute");
const verifyToken = require("./Middleware/middleware");
const RecipeRoute = require("./routes/RecipeRoute");
const forgotPassword = require("./routes/forgotPassword");

app.use(express.json());
app.use(cors());

// Mount routes
app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", forgotPassword);

// Create a router for protected home route
const router = express.Router();
router.get("/", verifyToken, Home.Home);
app.use("/auth", router);

// Start server only if DB config is loaded successfully
const PORT = process.env.PORT || 5001;

if (config) {
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
  });
} else {
  console.error("DB config failed, server not started");
}
