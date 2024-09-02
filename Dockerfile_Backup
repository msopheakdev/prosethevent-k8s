# Step 1: Use an official Node.js 14 runtime based on Alpine Linux as the base image
FROM node:14-alpine

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Expose the application port
EXPOSE 8080

# Step 7: Define the command to run the application
CMD ["node", "index.js"]

# Optional: Multi-stage build to reduce the image size
# FROM node:14-alpine as production
# WORKDIR /usr/src/app
# COPY --from=0 /usr/src/app .
# CMD ["node", "index.js"]

