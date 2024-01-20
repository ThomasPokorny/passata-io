# Use the official Node.js image as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
