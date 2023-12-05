# base image
FROM node:latest

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install --legacy-peer-deps

# copy app files
COPY . .

# build the app
RUN npm run build

# set production environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# expose port
EXPOSE 8000

# start the app
CMD [ "npm", "run", "build" ]
