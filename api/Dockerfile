FROM node:18

WORKDIR /app

COPY ./package*.json ./

RUN npm i --no-audit --no-fund --progress=false --no-warnings --log-level=error

COPY ./ ./

EXPOSE ${API_PORT}

CMD ["npm", "start"]
