FROM node

WORKDIR /app/shopping

COPY . .

RUN npm i

RUN npm run build

EXPOSE 8003

CMD [ "npm", "start" ]

