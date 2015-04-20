# Dockerfile for Question app

FROM ubuntu:14.04

# Installing dependencies & utilities
RUN apt-get update -q && apt-get install -q -y supervisor mysql-server npm && apt-get clean

RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD ./supervisord.conf /etc/supervisor/conf.d/

# Make a folder for our sources
RUN mkdir /usr/src/question-app

# Attach sources to container
ADD ./ /usr/src/question-app/

WORKDIR /usr/src/question-app

RUN npm install -g bower grunt-cli && npm install && bower install --allow-root
RUN grunt build && service mysql start && mysql -uroot < /usr/src/question-app/api/questions.sql

EXPOSE 8081

CMD ["node" "/usr/src/question-app/api/index.js"]
