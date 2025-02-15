# Kanji Automation App

Welcome to the Kanji Automation App! This project automates the processing of kanji characters by combining a React frontend with two Node.js backends. One backend runs in the main folder, and another runs in the `my-ankii/kanjiserver` folder. The app uses RobotJS to simulate key presses and mouse actions, allowing for full-screen automation of kanji display and processing.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [RobotJS Details](#robotjs-details)
- [Usage](#usage)
- [License](#license)

## Overview
This application automates the processing of kanji characters by:

- Fetching a list of kanji from a MongoDB database.
- Displaying each kanji on a full-screen page.
- Simulating a sequence of key presses (mouse clicks, Shift, Alt+E, Escape, and PageDown) using RobotJS.
- Allowing users to submit their own kanji lists and categories via a form page.

## Prerequisites
Before running this app, ensure you have:

- **Node.js** installed (v14 or above recommended).
- **MongoDB** database (either local or hosted).
- **A GUI-enabled environment** for RobotJS.
  
> **Note:** RobotJS requires a graphical environment to simulate mouse and keyboard events. This means you cannot run the backend on a headless server unless you use a virtual display.

For the frontend, we are using **Vite** as the build tool.

The **Yomitan Extension** and **Anki** are recommended if you plan to use the automation features with your own kanji input (see Yomitan Configuration).

## Installation
### Clone the repository:
```bash
git clone https://github.com/Rehan1908/AutoKanji.git
cd my-ankii
```

### Install dependencies for the frontend and both backends:
#### In the root folder (for the main backend and frontend):
```bash
npm install
```
#### In the `my-ankii/kanjiserver` folder, install its dependencies:
```bash
cd my-ankii/kanjiserver
npm install
```

## Configuration
### Environment Variables:
Create a `.env` file in the appropriate backend directories (both in the root and in `my-ankii/kanjiserver` if needed) with the following keys:
```env
MONGOOSE_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key_for_authentication
PORT=3000
```
For the frontend (Vite), create a `.env` file in the root of your Vite project:
```env
VITE_SECRET=your_secret_key_for_frontend
```

### Security:
- The backend uses **Helmet** to set secure HTTP headers.
- Sensitive endpoints are protected by an authentication middleware that requires an **X-Secret** header matching your `SECRET_KEY`.

## Running the Application
### Start the Main Backend:
From the root folder (`my-ankii`):
```bash
node server.js
```
You should see `Server is running on port 3000` in your terminal.

### Start the Kanji Server:
In a separate terminal, navigate to the `kanjiserver` folder:
```bash
cd my-ankii/kanjiserver
node server.js
```

### Start the Frontend:
From the root folder of your Vite project:
```bash
npm run dev
```
Open your browser to the provided URL (e.g., `http://localhost:3000` or as configured) to use the app.

## RobotJS Details
This project uses **RobotJS** to simulate key presses and mouse actions. RobotJS is a powerful tool for desktop automation, but note the following:

- **GUI Dependency**: RobotJS requires an active graphical environment. If you plan to deploy your backend, ensure it’s hosted on a machine with a GUI (or a virtual display).
- **Permissions**: On some operating systems (like macOS), you may need to grant accessibility permissions for RobotJS to control the mouse and keyboard.
- **Usage**: The automation sequence includes actions such as a mouse left click, double click, and simulated key presses (Shift, Alt+E, Escape, PageDown). This approach is designed as a "lazy developer's solution" to automate kanji processing.
- **Limitations**: RobotJS may behave differently on various platforms, so thorough testing on your target environment is essential.

## Usage
### Submit Kanji:
- Navigate to the **Form** page to submit your own kanji and category.
- The application stores your submission in MongoDB and uses it to fetch the appropriate kanji list.

### Kanji Display & Automation:
- Once your kanji list is loaded, you can start the automation sequence (either by pressing **"s"** on your keyboard or clicking the **Start** button).
- The current kanji count is shown in the header, and you can stop the sequence with the **Stop** button.
