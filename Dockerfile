FROM nginx:1.19.1-alpine
LABEL maintainer="emilio@ociotec.com"

WORKDIR /usr/share/nginx/html

COPY index.html conway.css conway.js favicon.png ./
