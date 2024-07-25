FROM node:latest AS build 

WORKDIR /app


CMD [ "npm", "run", "start" ]

COPY package*.json ./ 

RUN npm ci

RUN npm install g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest


COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# copy the built Angular app files to the default nginx html directory
COPY --from=build /app/dist/lebensversicherung/broser /usr/share/nginx/html

EXPOSE 80

