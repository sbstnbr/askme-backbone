# Dockerfile for Presenter feedback backend

FROM node:4.2.3

# Make a folder for our backend
RUN mkdir /api
RUN mkdir /shibb-logs

# Attach backend to container
COPY ./ /api/

WORKDIR /api

RUN npm install

# Mount point for static files
VOLUME ["/api", "/shibb-logs"]

EXPOSE 8081

CMD ["node", "/api"]
