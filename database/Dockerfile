# Dockerfile for Question app

FROM mysql
    
# Make a folder for our backend
RUN mkdir /app

# Attach backend to container
ADD ./questions.sql /

ENV MYSQL_ROOT_PASSWORD pass

EXPOSE 3306
