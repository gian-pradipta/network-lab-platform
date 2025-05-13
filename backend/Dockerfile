FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install
# Rebuild sqlite3 for the container's platform
RUN npm rebuild sqlite3

RUN npm run build

COPY . .

EXPOSE 8080
