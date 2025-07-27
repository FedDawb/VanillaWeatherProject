import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# FIX 1: There was a missing space here. It should be 'from dotenv'.
from dotenv import load_dotenv

# Load environment variables from a .env file (for the API key)
load_dotenv()

# --- Configuration ---
API_KEY = os.getenv("WEATHER_API_KEY")
if not API_KEY:
    raise ValueError("No WEATHER_API_KEY set in environment variables or .env file")

API_URL = "https://api.shecodes.io/weather/v1/forecast"

# --- FastAPI App Initialization ---
app = FastAPI()

# --- CORS Middleware ---
# FIX 2: The parameters inside a function call must be separated by commas.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# --- API Endpoint ---
@app.get("/weather/{city}")
async def get_weather(city: str, units: str = "metric"):
    # FIX 3: The items in this dictionary also need to be separated by commas.
    params = {"query": city, "key": API_KEY, "units": units}
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(API_URL, params=params)
            # This will raise an exception for 4xx or 5xx status codes.
            response.raise_for_status() 
        except httpx.HTTPStatusError as exc:
            # If the weather API returns an error (e.g., city not found),
            # forward that error to our frontend.
            print(f"HTTP Exception for {city}: {exc.response.status_code}")
            raise HTTPException(status_code=exc.response.status_code, detail="Error fetching weather data from the provider.")
        except httpx.RequestError as exc:
            # If the request to the weather API fails entirely (e.g., network issue).
            print(f"Request Error for {city}: {exc}")
            raise HTTPException(status_code=500, detail="Could not connect to the weather service.")
            
    # Return the JSON data from the weather API directly to the frontend.
    return response.json()
