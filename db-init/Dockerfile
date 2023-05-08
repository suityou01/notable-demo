FROM alpine:3.17.3
RUN apk update && \
    apk add --no-cache mariadb-connector-c-dev \
    mysql mysql-client
COPY . .
CMD ["sh", "-c", "mysql --host=db --user=${MYSQL_USER} --password=${MYSQL_PASSWORD} < setup.sql"]