import React from "react";
import "./GettingStartedPage.css"; // Optional: add your custom styling here
import { Link } from "react-router-dom";

const GettingStartedPage = () => {
  return (
    <div className="getting-started-container">
      <h1>Getting Started</h1>
      <p>
        Welcome to the Getting Started page for our Kanji Automation App!
      </p>
      
      <section>
        <h2>Overview</h2>
        <p>
          This application automates kanji processing by combining a React frontend with two Node.js backends. One backend runs in your main folder and another in the <code>my-ankii/kanjiserver</code> folder. The app fetches a list of kanji and processes them one by one with simulated key presses.
        </p>
      </section>
      
      <section>
        <h2>Pre-Requisites</h2>
        <ol>
          <li>
            <strong>Yomitan Extension:</strong> Before you even begin, you must have the Yomitan extension fully configured and running. (Watch the configuration guide{" "}
            <a
              href="https://youtu.be/_MWtbI4IwfU?si=8fyh_3VtipJ-fOGk&t=859"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .)
          </li>
          <li>
            <strong>Anki:</strong> Make sure Anki is running at all times while you add kanji.
          </li>
        </ol>
      </section>
      
      <section>
        <h2>Installation</h2>
        <ol>
          <li>Clone the repository to your local machine.</li>
          <li>
            Install dependencies for both the frontend and both backends:
            <pre>
              <code>npm install</code>
            </pre>
          </li>
          <li>
            Create a <code>.env</code> file in each backend folder and define:
            <ul>
              <li>
                <code>MONGOOSE_URL</code> – your MongoDB connection string
              </li>
              <li>
                <code>SECRET_KEY</code> – a secret key for protecting endpoints
              </li>
              <li>
                <code>PORT</code> – (optional) the port number to run the server
              </li>
            </ul>
          </li>
        </ol>
      </section>
      
      <section>
        <h2>Configuration</h2>
        <p>
          Ensure your environment variables are correctly configured in each backend’s <code>.env</code> file. These are critical for connecting to MongoDB and for securing your sensitive endpoints.
        </p>
      </section>
      
      <section>
        <h2>Running the Application</h2>
        <ol>
          <li>
            Start the main backend:
            <pre>
              <code>cd my-ankii
node server.js</code>
            </pre>
          </li>
          <li>
            Start the kanji server:
            <pre>
              <code>cd my-ankii/kanjiserver
npm index.js</code>
            </pre>
          </li>
          <li>
            Start the frontend (using Vite):
            <pre>
              <code>npm run dev</code>
            </pre>
          </li>
        </ol>
        <p>
          Once the servers are running, the frontend will load your kanji list. You can start processing the kanji by pressing the "Start" button or simply by pressing the "s" key.
        </p>
      </section>
      
      <section>
        <h2>Usage (A Lazy Developer's Tale)</h2>
        <p>
          Each kanji is displayed on a full-screen page. The automation moves through the pages by simulating key presses. You must keep your mouse cursor over the start of the kanji – because, let's be honest, it's a lazy developer’s solution to the “perfect scroll” problem!
        </p>
        <p>
          In our brilliant (if somewhat lazy) solution, our backend simulates:
        </p>
        <ul>
          <li>A mouse left click and a double click to ensure focus,</li>
          <li>A press of the letter "s" to start (because who doesn’t like a little extra shortcut fun?),</li>
          <li>Then a sequence of Shift, Alt+E, Escape, and finally PageDown (or your preferred key) to move to the next kanji.</li>
        </ul>
        <p>
          So sit back, configure Yomitan (link above) and keep Anki running, because this solution is designed for those who appreciate a shortcut—even if it means holding the mouse over the same spot while the magic happens.
        </p>
      </section>
      <section>
        <h2>Next Steps</h2>
        <p>
          Now that you are ready, go to the <Link to="/home">Forms Page</Link> and enter your kanjis.
        </p>
      </section>
    </div>
  );
};

export default GettingStartedPage;
