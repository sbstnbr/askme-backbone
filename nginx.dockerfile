FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /var/www
RUN mkdir /var/www/frontend

ADD ./dist /var/www/frontend
