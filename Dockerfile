
### Building ###
FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci
#npm install

COPY . .

RUN npm run ng build --prod

### Running ###

FROM nginx:alpine

COPY --from=builder /app/dist/openapi-center-front /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]