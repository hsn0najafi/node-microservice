FROM node

WORKDIR /app/customer

COPY . .

RUN npm i

RUN npm run build

EXPOSE 8001

CMD [ "npm", "start" ]

