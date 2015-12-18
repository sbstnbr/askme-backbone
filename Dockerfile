FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /var/www
RUN mkdir /var/www/frontend

# to make the dist pkg part of the container unommend next line 
# note: build the dist pkg before invoking container build
# COPY ./dist /var/www/frontend

VOLUME ["/var/www/frontend"]
