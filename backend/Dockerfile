# Dockerfile

# 1. Use an official Python runtime as a parent image.
# This is the base layer for our application.
FROM python:3.9-slim

# 2. Set the working directory inside the container.
# All future commands will run from this '/app' folder.
WORKDIR /app

# 3. Copy the requirements file into the container.
COPY requirements.txt .

# 4. Install the Python packages specified in requirements.txt.
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your application's code (like main.py) into the container.
COPY . .

# 6. Tell Docker that the container will listen on port 8000.
EXPOSE 8000

# 7. Define the command to run when the container starts.
# This starts your FastAPI server.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]