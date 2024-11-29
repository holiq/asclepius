FROM node:22
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=8080
ENV MODEL_URL="https://storage.googleapis.com/holiq-asclepius/model.json"

CMD [ "npm", "start" ]

EXPOSE 8080