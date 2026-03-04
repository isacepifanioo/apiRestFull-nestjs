FROM node:20.19.5-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@11.11.0 \
    && npm install --omit=dev

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]