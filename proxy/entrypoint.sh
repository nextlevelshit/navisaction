#!/bin/bash

APP_HOST=${APP_HOST:-app.localhost}
API_PORT=${API_PORT:-3000}
API_CONTAINER=${API_CONTAINER:-api}
WEB_PORT=${WEB_PORT:-8080}
WEB_CONTAINER=${WEB_CONTAINER:-web}
SSL_PORT=${SSL_PORT:-8081}
SSL_CONTAINER=${SSL_CONTAINER:-ssl}
envsubst '${APP_HOST},${API_PORT},${API_CONTAINER},${WEB_PORT},${WEB_CONTAINER},${SSL_PORT},${SSL_CONTAINER}' < /usr/local/etc/haproxy/haproxy.cfg.template > /usr/local/etc/haproxy/haproxy.cfg
cat /usr/local/etc/haproxy/haproxy.cfg

# Run haproxy as the haproxy user
haproxy -f /usr/local/etc/haproxy/haproxy.cfg
