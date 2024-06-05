# Use the Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

COPY .env .env

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
