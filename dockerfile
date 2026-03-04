FROM node:20.19.5-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]