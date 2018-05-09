FROM node:8

RUN mkdir -p /srv/nice
WORKDIR /srv/nice
COPY . ./
RUN npm install
RUN npm run build-storybook