
### Building ###
FROM node:10-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci
#npm install

COPY . .

RUN npm run ng build --prod

### Running ###

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]