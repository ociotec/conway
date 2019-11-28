FROM nginx:alpine
LABEL maintainer="emilio@ociotec.com"

WORKDIR /usr/share/nginx/html

COPY index.html conway.css conway.js favicon.png ./
