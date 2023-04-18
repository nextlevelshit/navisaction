#!/bin/bash

mkdir -p /etc/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/cert.pem.key \
  -out /etc/ssl/cert.pem \
  -subj "/C=US/ST=California/L=San Francisco/O=LocalDev/OU=IT Department/CN=${CERT_HOST}"

cat /etc/ssl/cert.pem /etc/ssl/cert.pem.key > /etc/ssl/fullchain.pem
cat /etc/ssl/fullchain.pem