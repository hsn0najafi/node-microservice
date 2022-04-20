FROM node

WORKDIR /app/products

COPY . .

RUN npm i

RUN npm run build

EXPOSE 8002

CMD [ "npm", "start" ]

