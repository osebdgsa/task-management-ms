FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript files
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
