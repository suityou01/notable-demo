FROM ubuntu:latest
USER root
WORKDIR /app
COPY ./package.json /app/package.json
RUN apt-get update && apt-get -y install \
    curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN set -e; \
    apt-get update && \
    apt-get install -qqy \
    nodejs && \
    rm -rf /var/lib/apt/lists;
RUN node  -v
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

