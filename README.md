# My Full-Stack Learning Project: The Weather App

This project is a personal learning journey to understand how a frontend application communicates with a backend server. After working on a similar concept in a group project, I was wanted to apply these skills independently. I chose to adapt one of my first personal projects, a simple "Vanilla JS Weather App," to see if I could evolve it into a modern, full-stack application.

The "Before": A Live Demo of the Original App
To fully appreciate the evolution of this project, you can see the original Vanilla JS version running live here:

View the original live app on Netlify https://fedawbweatherapp.netlify.app/

## My Learning Journey: From Vanilla JS to a Full-Stack Docker App
My goal was to bridge the gap between frontend and backend development. I broke the process down into three learning objectives:

Phase 1: The Vanilla JS Foundation
The original project was a client-side weather app built with HTML, CSS, and vanilla JavaScript. It was a solid foundation with several key features:

Real-time Data: Fetched weather data from the SheCodes Weather API using axios.

Dynamic UI: The interface updated dynamically to display the city name, temperature, humidity, wind speed, and a weather icon.

5-Day Forecast: It fetched and displayed a 5-day weather forecast, dynamically generating the forecast elements.

# Semantic & Responsive: The initial design used semantic HTML and was responsive for both mobile and desktop.

Phase 2: Modernizing the Frontend with Tailwind CSS & AI Assistance
The original app was functional, but I wanted to learn a modern CSS framework to create a more professional UI.

Why Tailwind CSS? I chose Tailwind CSS to build a responsive, utility-first design system. This approach is highly scalable and allowed me to create a polished, modern interface that works seamlessly across all devices.

##  How I Utilized AI: 
I leveraged an AI assistant as a pair-programming tool to accelerate the refactoring process. I used it to help structure the responsive grid layout and generate the initial Tailwind classes, which I then reviewed, tested, and customized. This demonstrates an ability to use modern tools to enhance productivity while maintaining full control over the final code quality.

Phase 3: Building a Full-Stack Application with a Python Backend
This was the core of the project. I wanted to fix a major security flaw in my original app where the API key was exposed.

# Why a Backend?

Security: The new backend acts as a secure proxy, hiding the API key from the user's browser.

Separation of Concerns: This architecture separates the frontend presentation layer from the backend data-fetching logic, a standard professional practice that makes the application easier to maintain and scale.

Technology Choice: I chose Python with the FastAPI framework to build the backend due to its high performance, modern asynchronous capabilities, and excellent developer experience.

Phase 4: Understanding Deployment with Docker
To complete the project, I wanted to learn about containerization. I created a Dockerfile for my Python backend. This was a challenging but rewarding step that taught me how to create a consistent, reproducible environment for my application. It was a practical introduction to DevOps principles and the importance of making applications portable.

Architecture Diagram
The new full-stack architecture ensures a secure and scalable application.

# Tech Stack
Category

Technology

Frontend

HTML5, CSS3, Tailwind CSS, JavaScript (ES6+)

Backend

Python, FastAPI, Uvicorn

Containerization

Docker

API

Axios (for frontend HTTP requests), SheCodes Weather API

## How to Run Locally
To run this project on your local machine, you will need Docker Desktop installed and running.

- Clone the Repository

   git clone - https://github.com/FedDawb/VanillaWeatherProject
   cd your-repo-name


- Run the Backend (with Docker) Navigate to the backend directory and build the Docker image.

  cd backend
  docker build -t weather-app-backend .


  Once the build is complete, run the container. This will start the backend server on http://localhost:8000.

  docker run -p 8000:8000 --env-file .env weather-app-backend


- Run the Frontend Open a new, separate terminal window. Navigate to the frontend directory and start the simple Python web server.

   cd frontend
   python -m http.server 8001


- View the Application Open your web browser and navigate to: http://localhost:8001


# Future Improvements
This project has a solid foundation that can be extended further.

Implement Caching: Add a caching layer (e.g., with Redis) to the backend to reduce redundant API calls.

Data Visualization: Use a library like Chart.js to create a graph of the temperature forecast.

Geolocation Support: Add a button to fetch weather based on the user's current location.

Accessibility: Implement a Dark Mode toggle.

Unit & Integration Tests: Add unit tests for the backend logic using Pytest and for frontend helper functions.

Deployment: Deploy the full-stack application to a cloud service.

Built by Dawn Hughes.
