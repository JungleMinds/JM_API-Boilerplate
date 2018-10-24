FROM node:8.12.0 as base

ENV PORT=4050

# Create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
# Install app dependencies
COPY package.json package-lock.json /home/node/app/
RUN npm i

COPY ./ /home/node/app/

CMD ["npm","start"]
#RUN npm run start
EXPOSE $PORT
