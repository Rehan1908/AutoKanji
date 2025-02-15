import React, { useState, useEffect, useRef, useContext } from "react";
import "./App.css";
import { CategoryContext } from "./components/CategoryContext";

const API_KANJI_URL = "http://localhost:3000/kanji";
const API_PRESS_KEY_SEQUENCE_URL = "http://localhost:5000/press-key-sequence";
const API_CURRENT_KANJI_URL = "http://localhost:3000/currentkanji";
const SECRET = import.meta.env.VITE_SECRET;

const App = () => {
  const [kanjis, setKanjis] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const stoppedRef = useRef(false);
  const { category } = useContext(CategoryContext);

  useEffect(() => {
    if (!category) return;
    fetch(`${API_KANJI_URL}?category=${encodeURIComponent(category)}`, {
      headers: { "X-Secret": SECRET },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch kanji data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.kanji) {
          setKanjis(data.kanji);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [category]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isStarted && event.key.toLowerCase() === "s") {
        console.log("Start triggered by 's' key.");
        setIsStarted(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStarted]);

  useEffect(() => {
    if (kanjis.length > 0 && isStarted) {
      (async () => {
        for (let i = 0; i < kanjis.length; i++) {
          if (stoppedRef.current) {
            console.log("Sequence stopped.");
            break;
          }
          setCurrentIndex(i + 1);
          console.log(`Processing kanji #${i}`);
          try {
            await fetch(API_PRESS_KEY_SEQUENCE_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Secret": SECRET,
              },
              body: JSON.stringify({}),
            });
          } catch (error) {
            console.error("Error processing key sequence:", error);
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      })();
    }
  }, [kanjis, isStarted]);

  const handleStop = async () => {
    setIsStopped(true);
    stoppedRef.current = true;
    console.log("Stopping at kanji count:", currentIndex);
    try {
      await fetch(API_CURRENT_KANJI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret": SECRET,
        },
        body: JSON.stringify({ current: currentIndex, category }),
      });
      console.log("Current kanji count sent successfully.");
    } catch (error) {
      console.error("Error sending current kanji count:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <p>
          Kanji Count: {currentIndex} / {kanjis.length}
        </p>
        {!isStopped && <button onClick={handleStop}>Stop</button>}
        {!isStarted && (
          <button onClick={() => setIsStarted(true)}>Start</button>
        )}
      </div>
      <ul className="kanji-list">
        {kanjis.map((kanji, index) => (
          <li key={index} className="kanji-item">
            {index === 0 ? (
              <>
                <span>&lt;-- Place the Cursor Right Here Press S to get Started</span>
              </>
            ) : (
              kanji
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
