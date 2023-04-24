FROM node:18 AS builder
# Set the working directory
WORKDIR /app
# Copy the project files to the container
COPY ./package*.json ./
# Install dependencies
RUN npm i --no-audit --no-fund --progress=false --no-warnings --log-level=error
# Copy the rest of the project files to the container
COPY ./ ./
# Set enviruonment variables @todo not working
ARG API_URL

ENV NGINX_DEBUG "true"
ENV NODE_ENV "production"
ENV VITE_API_URL "$API_URL"
# Build the project
RUN npm run build
# New base image for nginx
FROM nginx:1.21.3-alpine
# Copy the build output to the nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh
