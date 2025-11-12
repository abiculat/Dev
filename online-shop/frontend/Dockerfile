FROM node:18-alpine AS build

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/frontend/build ./

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
