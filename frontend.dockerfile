FROM lukaasp/alpine-nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /var/www/frontend

ADD ./dist /var/www/frontend

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
