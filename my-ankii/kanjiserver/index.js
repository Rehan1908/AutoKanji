import { connect } from "mongoose";
import express, { json } from "express";
import { config } from "dotenv";
import Kanji from "./models/kanji.model.js"; // Ensure this path is correct
import cors from "cors";
import helmet from "helmet";

config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());

connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const authMiddleware = (req, res, next) => {
  if (!process.env.SECRET_KEY) {
    return res.status(500).json({ success: false, message: "Server configuration error" });
  }
  const secret = req.headers["x-secret"];
  if (!secret || secret !== process.env.SECRET_KEY) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Kanji server!" });
});

async function saveOrUpdateKanji(category, kanji) {
  let existingKanji = await Kanji.findOne({ category });
  if (!existingKanji) {
    existingKanji = new Kanji({
      kanji,
      category,
      currentkanjicount: 0,
    });
  } else {
    existingKanji.kanji = kanji;
  }
  await existingKanji.save();
}

app.post("/submitkanjis", authMiddleware, async (req, res) => {
  const { category, kanji } = req.body;
  console.log("Received request to submit kanjis:", { category, kanji });
  if (!category || !kanji) {
    return res.status(400).json({ success: false, message: "Missing category or kanji" });
  }
  try {
    if (typeof category !== 'string' || typeof kanji !== 'string') {
      return res.status(400).json({ success: false, message: "Category and kanji must be strings" });
    }
    await saveOrUpdateKanji(category, kanji);
    console.log("Kanji submitted successfully.");
    return res.status(200).json({ success: true, message: "Kanji submitted successfully." });
  } catch (error) {
    console.error("Error submitting kanji:", error);
    return res.status(500).json({ success: false, message: "Failed to save kanji", error: error.message });
  }
});

app.get("/kanji", async (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ error: "Category query parameter is required." });
  }
  try {
    const existingKanji = await Kanji.findOne({ category });
    if (!existingKanji) {
      return res.status(404).json({ error: "No kanji found for this category." });
    }
    const kanjiArray = existingKanji.kanji
      .split(" ")
      .filter(k => k.length > 0);
     
    res.json({ kanji: kanjiArray });
  } catch (error) {
    console.error("Error reading kanji:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/currentkanji", authMiddleware, async (req, res) => {
  const { current } = req.body;
  const{ category } = req.body;
  console.log("Current kanji count:", current);
  try {
    await Kanji.updateOne(
      { category: `${category}` },
      { $set: { currentkanjicount: current } }
    );
    res.json({ success: true, message: "Current kanji count updated." });
  } catch (error) {
    console.error("Error saving current kanji:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
