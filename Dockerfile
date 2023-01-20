# Dockerfile
FROM node:latest

ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"

RUN curl "https://install.meteor.com/" | sh

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g meteor
RUN meteor npm install

EXPOSE 3000
CMD ["meteor"]