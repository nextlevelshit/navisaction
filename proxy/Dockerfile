FROM ubuntu:latest

# set working directory
WORKDIR /usr/src/app

# install dependencies
RUN apt-get update && apt-get install -y \
    haproxy \
    ca-certificates \
    curl \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# install mkcert
RUN curl -L -o /usr/local/bin/mkcert "https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64"
RUN chmod +x /usr/local/bin/mkcert

# create a certificate authority (CA) if it doesn't already exist
RUN mkcert -install

# copy HAProxy configuration file
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg

# copy gen-certs.sh script
COPY gen-certs.sh /usr/local/bin/gen-certs.sh
RUN chmod +x /usr/local/bin/gen-certs.sh

# generate SSL certificates
CMD ["/bin/bash", "-c", "CERT_HOST=${CERT_HOST:-localhost} APP_HOST=${APP_HOST:-localhost} /usr/local/bin/gen-certs.sh && haproxy -f /usr/local/etc/haproxy/haproxy.cfg"]
