FROM ubuntu:latest
# set working directory
WORKDIR /usr/src/app
# install dependencies
RUN apt-get update && apt-get install -y haproxy gettext sudo && rm -rf /var/lib/apt/lists/*
# copy HAProxy configuration template file
COPY haproxy.cfg.template /usr/local/etc/haproxy/haproxy.cfg.template
# copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
# switch back to the haproxy user
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
