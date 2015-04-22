# Dockerfile for Question app

FROM ubuntu:14.04

# Installing dependencies & utilities
RUN apt-get update -q && apt-get install -q -y npm && apt-get clean

RUN ln -s /usr/bin/nodejs /usr/bin/node
    
# Make a folder for our backend
RUN mkdir /app

# Attach backend to container
ADD ./ /app/

# Mount point for static files
VOLUME ["/app/dist"]
VOLUME ["/app/api"]

WORKDIR /app

RUN npm install

EXPOSE 8081

CMD ["node", "/app/api"]
