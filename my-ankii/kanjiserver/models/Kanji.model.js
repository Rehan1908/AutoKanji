import mongoose from "mongoose";

const KanjiSchema = new mongoose.Schema({
  kanji: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  currentkanjicount: {
    type: Number,
    required: true,
  },
});
const Kanji = mongoose.model("Kanji", KanjiSchema);
export default Kanji;