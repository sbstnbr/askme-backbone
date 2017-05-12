FROM openshift/base-centos7

RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash - && \
    yum install -y nodejs

RUN npm install -g bower && \
    npm install -g grunt-cli && \
    npm cache clean

copy ./ ./

run npm install && \
    bower --allow-root install

EXPOSE 9999

CMD ["grunt", "serve"]
