FROM node:latest
RUN mkdir -p /app/src
WORKDIR /app/src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 6003
# CMD ["node", "index.js"]
# RUN npm run start
CMD ["node", "server/index.js"]