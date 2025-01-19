
Here's your README with the terminal commands and examples formatted using Markdown, as you requested:

FocusHive
Web app that tracks stored notes summaries and analytics.

ytweb
ytweb is a web application built to display YouTube analytics for users, helping them track their video history, time spent, and more.

Features
YouTube Analytics: Displays daily time spent on YouTube, video history for a selected day, and detailed weekly/monthly analysis.
Tech Stack
Frontend: React, HTML, CSS
Backend: Node.js (Express)
Authentication: Google OAuth
Version Control: Git, GitHub
Getting Started
Prerequisites
Node.js and npm (or yarn)
A Google Cloud project with OAuth credentials for authentication
Setup Instructions
Clone the repository:

Open your terminal and run the following command:

bash
Copy
Edit
git clone https://github.com/MaheswariDarish/ytweb.git
cd ytweb
Install dependencies:

Install all required dependencies by running:

bash
Copy
Edit
npm install
Setup the .env file:

Create a .env file in the root directory.

Add your Google OAuth credentials:

plaintext
Copy
Edit
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
Run the development server:

Start the development server:

bash
Copy
Edit
npm start
Open your browser and navigate to http://localhost:3000 to view the application.

