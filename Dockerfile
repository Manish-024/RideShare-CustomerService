FROM node:18-alpine
WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm install

# Copy code + env
COPY . .

# Expose the port your Express app uses (e.g. 4000)
EXPOSE 4001

# Start via nodemon or node
CMD ["npm", "start"]