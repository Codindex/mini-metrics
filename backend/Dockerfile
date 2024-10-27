# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Flask dependencies
RUN pip install flask

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
