FROM node:latest
RUN mkdir -p /app/src
WORKDIR /app/src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 6003
CMD ["node", "index.js"]