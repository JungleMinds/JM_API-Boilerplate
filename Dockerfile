FROM keymetrics/pm2:8-alpine

# Add software
RUN apk add --no-cache git

ENV NPM_CONFIG_LOGLEVEL=warn

# Create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Bundle APP files
COPY .git /home/node/app/.git/
COPY src /home/node/app/src/
COPY scripts /home/node/app/scripts/
COPY .env index.js package.json package-lock.json ecosystem.config.js /home/node/app/

# Show current folder structure in logs (without node_modules)
RUN ls -la

# Install app dependencies
RUN npm install --production

# Run the app also see https://pm2.io/doc/en/runtime/reference/ecosystem-file/
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]

# Expose the listening port of your app
EXPOSE $PORT
