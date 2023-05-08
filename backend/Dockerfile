# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node16-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node16

WORKDIR /home/site/wwwroot

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot
COPY ./prisma prisma

RUN cd /home/site/wwwroot && \
    npm install && \
    npm run build

EXPOSE 80 7071

CMD ["npm", "start"]