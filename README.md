working images:
<img width="1440" height="783" alt="image" src="https://github.com/user-attachments/assets/db543b78-1b17-464e-993c-5df69b6c4026" />
<img width="1439" height="786" alt="image" src="https://github.com/user-attachments/assets/f4a4e98f-56d4-48b2-a82f-a94cba68e963" />
<img width="1440" height="734" alt="image" src="https://github.com/user-attachments/assets/5e6c769a-0aef-42f6-a9df-192325acd6a4" />
<img width="1440" height="786" alt="image" src="https://github.com/user-attachments/assets/69cee520-62e4-4d52-944c-dd073c733472" />


#AI-Powered OOP Interview Prep Tool!
This project is a full-stack application designed to help software developers prepare for technical interviews, focusing specifically on Object-Oriented Programming (OOP) concepts. It leverages Google's Gemini LLM to dynamically generate new challenges, ensuring a fresh and comprehensive study experience.

The backend is built with FastAPI, and it uses a serverless Neon Postgres database for data persistence.

!

✨ Features
Dynamic Challenge Generation: Uses the Google Gemini API to create a never-ending stream of unique OOP questions and coding challenges.

Fast & Modern Backend: Built with FastAPI, providing a high-performance, asynchronous API.

Serverless Database: Leverages Neon for a scalable and easy-to-manage Postgres database.

RESTful API: Clean and accessible endpoints for fetching and managing content.

🛠️ Tech Stack
Backend: Python, FastAPI

Database: Neon (Serverless Postgres)

AI / LLM: Google Gemini

Frontend: Vite+React

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have the following installed on your machine:

Python 3.8+ and pip

Node.js and npm (for the frontend)

Git for version control

⚙️ Installation & Setup
Clone the repository:

Bash

git clone <--link pf the projecct-->
cd your-repo-name
Setup the Backend:

Navigate to the backend directory:

Bash

cd backend
Create and activate a virtual environment:

Bash

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
.\venv\Scripts\activate
Install the required Python packages using uv (it will be installed first if not present):

Bash

pip install uv && uv pip install -r requirements.txt
Setup Environment Variables:

In the /backend directory, create a file named .env.

Copy the contents of .env.example (if you have one) or use the template below and fill in your credentials.

Ini, TOML

# .env file in the /backend directory

# Get this from your Neon database project
DATABASE_URL="your_neon_database_connection_string"

# Get this from Google AI Studio
GEMINI_API_KEY="your_google_gemini_api_key"
Setup the Frontend:

Navigate to the frontend directory from the root folder:

Bash

cd frontend
Install the required npm packages:

Bash

npm install
(Optional) If your frontend needs an API key or URL, create a .env file in the /frontend directory and add it there.

▶️ Run the Application
You will need to run the backend and frontend servers in two separate terminals.

Terminal 1: Start the Backend Server

Bash

# Make sure you are in the /backend directory with the virtual environment activated
uv run derver.js
Your FastAPI server should now be running on http://127.0.0.1:8000. The --reload flag will automatically restart the server when you make changes to the code.

Terminal 2: Start the Frontend Development Server

Bash

# Make sure you are in the /frontend directory
npm run dev
Your frontend application should now be running on http://localhost:3000 (or another port, check the terminal output).

You can now open your browser and navigate to the frontend URL to use the application!
