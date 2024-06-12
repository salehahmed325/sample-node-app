FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json./
RUN npm install

# Bundle app source
COPY..

# Install pm2
RUN npm install -g pm2

# Run pm2 to start the application
CMD ["pm2", "start", "server.js", "--watch"]