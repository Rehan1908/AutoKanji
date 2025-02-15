// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const robot = require("robotjs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const secret = req.headers["x-secret"];
  if (!secret || secret !== process.env.SECRET_KEY) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};

app.post("/press-key-sequence", authMiddleware, async (req, res) => {
  try {
    console.log("Performing mouse left click...");
    robot.mouseClick("left");

    console.log("Performing mouse double click...");
    robot.mouseClick("left", true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Pressing Shift key down...");
    robot.keyToggle("shift", "down");
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Releasing Shift key...");
    robot.keyToggle("shift", "up");

    console.log("Pressing Alt+E...");
    robot.keyToggle("alt", "down");
    robot.keyTap("e");
    robot.keyToggle("alt", "up");

    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Pressing Escape key...");
    robot.keyTap("escape");

    console.log("Pressing PageDown key...");
    robot.keyTap("pagedown");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.json({ success: true, message: "Key sequence pressed." });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
