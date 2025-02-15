import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "./CategoryContext";
import "./Formpage.css";

const SECRET = import.meta.env.VITE_SECRET;
if (import.meta.env.DEV && !SECRET) {
  console.error('Warning: VITE_SECRET environment variable is not set');
  throw new Error('Please set VITE_SECRET in your .env file');
}

const FormPage = () => {
  const [kanjiInput, setKanjiInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { category, setCategory } = useContext(CategoryContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!kanjiInput.trim()) throw new Error("Kanji input is required");
    if (!category.trim()) throw new Error("Category is required");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      validateInputs();
      const response = await fetch("http://localhost:3000/submitkanjis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret": SECRET,
        },
        body: JSON.stringify({ kanji: kanjiInput.trim(), category: category.trim() }),
      });

      console.log("Server response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (!data.success) {
        throw new Error("Invalid response from server");
      }

      setSuccess(true);
      setTimeout(() => navigate("/kanjidisplay"), 1500);
    } catch (error) {
      setError(error.message || "Error submitting kanji");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="example-usage">
        <h2>Example Usage</h2>
        <p>
          The best example usage of this is: if you're reading a web novel, simply open your AI assistant, paste the entire page, and ask it to extract all the individual kanji.
          (This is our lazy developer's solution!)
        </p>
        <p>To Get a list of Kanjis Just go the Web novel copy the chapter go to chatgpt <br></br>And give this Prompt: Extract a vocabulary list from the following Japanese text as follows:

Use a Japanese morphological analyzer to segment the text into full vocabulary tokens.
Keep each token in its “surface form” (i.e. include all attached kana, such as okurigana, if they change the word’s meaning).
Only include tokens that contain at least one kanji.
Remove duplicate tokens (preserve only the first occurrence of each unique token).
Output the final list as tokens separated by spaces (in order of first appearance).
Your response should be a space-separated list of unique vocabulary tokens (in order of first appearance) that include at least one kanji and preserve all okurigana, so the tokens remain fully meaningful as they appear in the text. Add your text after this:</p>
      </section>

      <div className="submit-kanji-container">
        <h1>Submit Your Kanji</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              disabled={isLoading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="kanji">Kanji:</label>
            <textarea
              id="kanji"
              value={kanjiInput}
              onChange={(e) => setKanjiInput(e.target.value)}
              placeholder="Enter kanjis"
              disabled={isLoading}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Kanji"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Kanji submitted successfully!</p>}
      </div>
    </>
  );
};

export default FormPage;
