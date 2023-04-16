#!/bin/bash

set -e

# install mkcert if it's not already installed
if ! command -v mkcert &> /dev/null
then
    echo "mkcert not found, installing..."
    apk add --no-cache libnss3-tools # for Alpine Linux
    # OR
    # apt-get update && apt-get install -y libnss3-tools # for Ubuntu/Debian
    # apt update && apt install -y mkcert # for Ubuntu 20.04 or later
fi

# create a certificate authority (CA) if it doesn't already exist
if [ ! -f "$HOME/.local/share/mkcert/rootCA.pem" ]; then
    echo "creating mkcert CA..."
    mkcert -install
fi

# create a certificate for the specified domain
echo "creating certificate for $CERT_HOST..."
if [ "$CERT_HOST" = "*" ]; then
    mkcert "*.$APP_HOST" || { echo "Error: Failed to generate wildcard certificate."; exit 1; }
    CERTNAME="_wildcard.$(echo "$APP_HOST" | sed 's/^[^\.]*\.//')"
else
    mkcert "$CERT_HOST" || { echo "Error: Failed to generate certificate for $CERT_HOST."; exit 1; }
    CERTNAME="$(echo "$CERT_HOST" | sed 's/\*/_wildcard/')"
fi

# concatenate the .pem and .key files
echo "concatenating .pem and .key files..."
cat "${CERTNAME}.pem" "${CERTNAME}-key.pem" > "${CERTNAME}_concat.pem" || { echo "Error: Failed to concatenate .pem and .key files."; exit 1; }

# move the .pem file to HAProxy's directory
echo "moving .pem file to HAProxy directory..."
mv "${CERTNAME}_concat.pem" /etc/ssl/fullchain.pem || { echo "Error: Failed to move .pem file to HAProxy directory."; exit 1; }

echo "done!"
