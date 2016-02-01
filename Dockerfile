FROM ubuntu:14.04

MAINTAINER AOWP version: 0.1

RUN apt-get update && apt-get install -y \
    apache2 \
    libapache2-mod-shib2 \
    shibboleth-sp2-schemas \
    supervisor \
    nano \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf /etc/apache2/sites-available/* && rm -rf /etc/apache2/sites-enabled/*
ADD deploy/askme_https.conf /etc/apache2/sites-available/
ADD deploy/services.conf /etc/supervisor/conf.d/services.conf
ADD deploy/passwords /etc/apache2/passwd/
RUN chmod -R 644 /etc/apache2/passwd/passwords
RUN mkdir /opt/sites
RUN cd /etc/apache2/sites-available/ && a2ensite *
RUN a2enmod ssl proxy proxy_http proxy_wstunnel rewrite headers
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

CMD ["/usr/bin/supervisord"]

VOLUME ["/etc/ssl","/etc/shibboleth", "/opt/sites"]

EXPOSE 80 443
