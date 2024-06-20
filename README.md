# Introduction

CarOpticom frontend.

## DEV WORKFLOW

### Install tools

- Yarn (1.22.x +)
- Node.js (v18)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/)

### Run during development

Authentication is required to pull images from Azure Container Registry.
Sign is with corporate account and use a "CarOpticom Subscription 1" subscription.

```bash
az login
az acr login -n acrcaropticomwesteuropedev002
```

We use [docker compose](https://docs.docker.com/compose/) to run dependencies.

From a root directory of project run command

- run all services

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev -p caropticom-cn up --build --remove-orphans
```

- stop and remove all services

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev -p caropticom-cn down
```

- run only selected services (name of service is defined in docker-compose.yaml)

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev -p caropticom-cn up dotnet-tool --build --remove-orphans
```

- stop services

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev -p caropticom-cn stop
```

- stop only selected services (name of service is defined in docker-compose.yaml)

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev -p caropticom-cn stop dotnet-tool
```

### Run to check is everything works with containers

From a root directory of project run command

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev -p caropticom-cn up --build --remove-orphans 
```

Will be available services:

- [caropticom-api](https://localhost:5001/graphql-private/)
- [caropticom-notification](https://localhost:7146)
- [caropticom-optipix-webhooks-api](https://localhost:7240)
- [caropticom-optipix-webhooks-api](https://localhost:7140)

stop containers

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev  -p caropticom-cn stop

```

stop containers and remove containers

```bash
docker compose -f docker-compose.yaml -f docker-compose.caropticom.yaml --env-file .env.dev  -p caropticom-cn down
```


## DEVELOPMENT SETUP

### Install tools and add .env.dev file

**ASK THE BACKEND TEAM TO SHARE A SQL SERVER BACKUP (Prospects.bacpac), certs directory and .env.dev files!!!**

- install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- clone repository from github
- in root directory create .env.dev file with

```.env.dev
BACKUP_VOLUMES_PATH=~/Works/Caropticom/NewOne/Backups
VOLUMES_PATH=~/Works/var/caropticom_cn
HTTPS_CERT_PATH=~/Works/Caropticom/NewOne/CAR_OPTICOM/certs
HTTPS_CERT_NAME_CRT=dev1.crt
HTTPS_CERT_NAME_KEY=dev1.key

MSSQL_SA_PASSWORD=Admin_123Password
MSSQL_HOST_PORT=1434

# observability
OLTP_ENDPOINT_URL=
SEQ_SERVER_URL=

DOTNET_ENVIRONMENT=Development
LOGGING__LOGLEVEL__DEFAULT=Debug
LOGGING__LOGLEVEL__SYSTEM=Information
LOGGING__LOGLEVEL__MICROSOFT=Information
LOGGING__LOGLEVEL__MICROSOFTASPNETCORE=Warning
LOGGING__APPLICATIONINSIGHTS__LOGLEVEL__DEFAULT=Information

# Shared variables
ASSETSSTORAGEOPTIONS__BASEURL=
LOCALIZATION__PROJECT_ID=
LOCALIZATION__APIKEY=
LOCALIZATION__ALLOWAUTOMATICSYNC=false
LOCALIZATION__LOCIZEUPDATEPERIODINHOURS=1.00:00:00
OPTICONTENT__BLOBSTORAGEOPTIONS__CONNECTIONSTRING=
OPTICONTENT__BLOBSTORAGEOPTIONS__CONTAINERNAME=opticontent
OPTICONTENT__BLOBSTORAGEOPTIONS__MAXCONCURRENCY=10
OPTICONTENT__BLOBSTORAGEOPTIONS__MAXTRANSFERSIZEINMB=100
OPTICONTENT__SERVICEBUSOPTIONS__CONNECTIONSTRING=
OPTICONTENT__SERVICEBUSOPTIONS__VEHICLEPROCESSEDQUEUENAME=vehicleprocessedqueue
OPTICONTENT__SERVICEBUSOPTIONS__VEHICLEPROCESSEDMAXCONCURRENTCALLS=1
OPTICONTENT__SERVICEBUSOPTIONS__VEHICLEDATADELETEDQUEUENAME=vehicledatadeletedqueue
OPTICONTENT__SERVICEBUSOPTIONS__VEHICLEDATADELETEDMAXCONCURRENTCALLS=1
OPTICONTENT__SERVICEBUSOPTIONS__VEHICLEVIDEOADDEDQUEUENAME=vehiclevideoaddedqueue
OPTICONTENT__SERVICEBUSOPTIONS__VEHICLEVIDEOADDEDMAXCONCURRENTCALLS=1
OPTICONTENT__OPTICONTENTINFRASTRUCTUREOPTIONS__DATABASEID=opticontent-db
OPTICONTENT__OPTICONTENTINFRASTRUCTUREOPTIONS__CONNECTIONSTRING=
OPTICONTENT__OPTICONTENTINFRASTRUCTUREOPTIONS__THROUGHPUT=1000
OPTICONTENT__OPTICONTENTINFRASTRUCTUREOPTIONS__USEINTEGRATEDCACHE=true
OPTICONTENT__OPTICONTENTINFRASTRUCTUREUSERMANAGEMENTOPTIONS__DATABASEID=authorization-db
OPTICONTENT__OPTICONTENTINFRASTRUCTUREUSERMANAGEMENTOPTIONS__CONNECTIONSTRING=
OPTICONTENT__OPTICONTENTINFRASTRUCTUREUSERMANAGEMENTOPTIONS__THROUGHPUT=1000
OPTICONTENT__OPTICONTENTINFRASTRUCTUREUSERMANAGEMENTOPTIONS__USEINTEGRATEDCACHE=true
OPTIPIXWEBHOOKSOPTIONS__HASHKEY=

# Caropticom optipix webhooks API
CAROPTICOM_OPTIPIX_WEBHOOKS_API_VERSION=0.0.9-debug
CAROPTICOM_OPTIPIX_WEBHOOKS_API_HTTP_PORT=5200
CAROPTICOM_OPTIPIX_WEBHOOKS_API_HTTPS_PORT=7240
CAROPTICOM_OPTIPIX_WEBHOOKS_API_OLTP_APP_NAME=CaroptcomOptipixWebhooksApi

# Caropticom optipix webhooks files Processor
CAROPTICOM_OPTIPIX_WEBHOOKS_FILES_PROCESSOR_VERSION=0.0.9-debug
CAROPTICOM_OPTIPIX_WEBHOOKS_FILES_PROCESSOR_HTTP_PORT=5100
CAROPTICOM_OPTIPIX_WEBHOOKS_FILES_PROCESSOR_HTTPS_PORT=7140
CAROPTICOM_OPTIPIX_WEBHOOKS_FILES_PROCESSOR_OLTP_APP_NAME=CaroptcomOptipixWebhooksFilesProcessor

# Caropticom Notification   
CAROPTICOM_NOTIFICATION_VERSION=0.0.9-debug
CAROPTICOM_NOTIFICATION_HTTP_PORT=5106
CAROPTICOM_NOTIFICATION_HTTPS_PORT=7146
CAROPTICOM_NOTIFICATION_HTTP2_PORT=7245
CAROPTICOM_NOTIFICATION_OLTP_APP_NAME=CaroptcomNotification

## appsettings.json configuration
CAROPTICOM_NOTIFICATION_NOTIFICATIONINFRASTRUCTURE_DISPLAYNAME='CarOpticom Platform'
CAROPTICOM_NOTIFICATION_NOTIFICATIONINFRASTRUCTURE_FROM=
CAROPTICOM_NOTIFICATION_NOTIFICATIONINFRASTRUCTURE_HOST=
CAROPTICOM_NOTIFICATION_NOTIFICATIONINFRASTRUCTURE_PORT=587
CAROPTICOM_NOTIFICATION_NOTIFICATIONINFRASTRUCTURE_USERNAME=
CAROPTICOM_NOTIFICATION_NOTIFICATIONINFRASTRUCTURE_PASSWORD=
CAROPTICOM_NOTIFICATION_NOTIFICATIONINFRASTRUCTURE_ATTACHMENTSSIZELIMITINMB=50

# caropticom API
CAROPTICOM_API_VERSION=0.0.35-debug
CAROPTICOM_API_HTTP_PORT=5647
CAROPTICOM_API_HTTPS_PORT=5001
CAROPTICOM_API_OLTP_APP_NAME=CaroptcomAPI

## appsettings.json configuration
APPLICATIONURL=http://localhost:3001/
FRONTEND__CLIENTID=
FRONTEND__AUTHORITY=
FRONTEND__KNOWNAUTHORITIES__1=
AZUREADAUTHENTICATION__INSTANCE=
AZUREADAUTHENTICATION__TENANTID=
AZUREADAUTHENTICATION__DOMAIN=
AZUREADAUTHENTICATION__CLIENTID=
AZUREADAUTHENTICATION__TOKENVALIDATIONPARAMETERS__VALIDATEISSUER=true
AZUREADAUTHENTICATION__TOKENVALIDATIONPARAMETERS__VALIDISSUER=
AZUREADAUTHENTICATION__TOKENVALIDATIONPARAMETERS__VALIDATEAUDIENCE=true
AZUREADAUTHENTICATION__TOKENVALIDATIONPARAMETERS__VALIDAUDIENCES__1=
AZUREADAUTHENTICATION__ALLOWWEBAPIOTBEAUTHORIZEDBYACL=true
AZUREADAUTHENTICATION__CALLBACKPATH=/signin-oidc
AZUREADAUTHENTICATION__CLIENTSECRET=
AZUREADAUTHENTICATION__SIGNUPSIGNINPOLICYID=B2C_1_signin
AZUREADINFRASTRUCTURE__TENANTID=
AZUREADINFRASTRUCTURE__CLIENTID=
AZUREADINFRASTRUCTURE__CLIENTSECRET=
AZUREADINFRASTRUCTURE__GRAPHAPIURL=
AZUREADINFRASTRUCTURE__IDENTITYISSUER=
OPTIPIXAPI__CAROPTICOMWEBHOOKSHANDLERBASEURL=
OPTIPIXAPI__URL=
OPTIPIXAPI__EMAIL=
OPTIPIXAPI__PASSWORD=qwer1234
OPTIPIXAPI__TOKENEXPIRATIONTHRESHOLD=00:05:00
OPTIPIXAPI__RETRIESCOUNT=3
OPTIPIXAPI__MAXERRORSALLOWED=5
OPTIPIXAPI__UNAVAILABILITYBREAK=00:00:30
OPTIPIXAUTHORIZATIONAPI__PASSWORDENCRYPTIONKEY=
KEYSMANAGEMENTINFRASTRUCTURE__TENANTID=
KEYSMANAGEMENTINFRASTRUCTURE__CLIENTID=
KEYSMANAGEMENTINFRASTRUCTURE__CLIENTSECRET=
KEYSMANAGEMENTINFRASTRUCTURE__OPTIPIXKEYVAULTURL=
BLOBSTORAGEINFRASTRUCTURE__CONNECTIONSTRING=
BLOBSTORAGEINFRASTRUCTURE__CONTAINERNAME=user-management-user-profile
COSMOSDBAUTHORIZATIONSTORAGE__CONNECTIONSTRING=
COSMOSDBAUTHORIZATIONSTORAGE__DATABASEID=authorization-db
COSMOSDBAUTHORIZATIONSTORAGE__THROUGHPUT=1000
COSMOSDBAUTHORIZATIONSTORAGE__USEINTEGRATEDCACHE=true
HUBSPOTAPI__STATICTOKEN=
HUBSPOTAPI__BASEURL=
HUBSPOTAPI__ALLOWAUTOMATICSYNC=true
HUBSPOTAPI__HUBSPOTCOMPANIESUPDATEPERIODSECONDS=300
HUBSPOTAPI__HUBSPOTPROPERTYUPDATEPERIODSECONDS=3600
COMPANIES__DATABASECONNECTIONSTRING=
AUDIT__COSMOSDBAUDITSTORAGE__DATABASEID=audit-db
AUDIT__COSMOSDBAUDITSTORAGE__CONNECTIONSTRING=
AUDIT__DATABASECONNECTIONSTRING=
AUDIT__RECALCULATEOVERVIEW__MAXDEGREEOFPARALLELISM=10
AUDIT__RECALCULATEOVERVIEW__UPDATEPERIODSECONDS=86400
AUDIT__RECALCULATEOVERVIEW__ISENABLED=true
AUDIT__ATTACHMENTS__ROOTCONTAINER=audit-attachments
AUDIT__ATTACHMENTS__CONNECTIONSTRING=
AUDIT__REPORTS__ROOTCONTAINER=audit-reports
AUDIT__REPORTS__CONNECTIONSTRING=
BI__ROOTCONTAINER=import
BI__ROOTCONTAINERAUDITS=import-audit
BI__CONNECTIONSTRING=DefaultEndpointsProtocol=
AZURESERVICEBUS__CONNECTIONSTRING=Endpoint=
CLOUDLAYEROPTIONS__APIKEY=
NOTIFICATIONSERVICE__SERVICEADDRESS=https://caropticom-notification
NOTIFICATIONSERVICE__SUPPRESSCONTEXTNOTFOUND=true
NOTIFICATIONSERVICE__CALLDEADLINEINSECONDS=30
NOTIFICATIONSERVICE__MAXRETRYCOUNT=5
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREOPTIONS__DATABASEID=configuration-db
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREOPTIONS__CONNECTIONSTRING=
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREOPTIONS__THROUGHPUT=1000
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREOPTIONS__USEINTEGRATEDCACHE=true
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__DATABASEID=authorization-db
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__CONNECTIONSTRING=
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__THROUGHPUT=1000
CAROPTICOMCONFIGURATION__CAROPTICOMCONFIGURATIONINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__USEINTEGRATEDCACHE=true
OPTILEADS__OPTILEADSINFRASTRUCTUREOPTIONS__DATABASEID=optileads-db
OPTILEADS__OPTILEADSINFRASTRUCTUREOPTIONS__CONNECTIONSTRING=
OPTILEADS__OPTILEADSINFRASTRUCTUREOPTIONS__THROUGHPUT=1000
OPTILEADS__OPTILEADSINFRASTRUCTUREOPTIONS__USEINTEGRATEDCACHE=true
OPTILEADS__OPTILEADSEMAILSERVICEBUSOPTIONS__OPTILEADSEMAILQUEUENAME=optileadsqueue
OPTILEADS__OPTILEADSEMAILSERVICEBUSOPTIONS__OPTILEADSEMAILMAXCONCURRENTCALLS=1
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREOPTIONS__DATABASEID=optiproduct-db
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREOPTIONS__CONNECTIONSTRING=
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREOPTIONS__THROUGHPUT=1000
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREOPTIONS__USEINTEGRATEDCACHE=true
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__DATABASEID=authorization-db
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__CONNECTIONSTRING=
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__THROUGHPUT=1000
OPTIPRODUCT__OPTIPRODUCTINFRASTRUCTUREUSERSMANAGEMENTOPTIONS__USEINTEGRATEDCACHE=true
OPTICONFIGAPI__URL=
OPTICONFIGAPI__EMAIL=master@caropticom.com
OPTICONFIGAPI__PASSWORD=master01
```

- to link the frontend to the local backend, modify the values in `./frontend/.env.local`. Create file if it does not exist

```text
VITE_API_URL_PRIVATE=http://localhost:5647/graphql-private
VITE_API_URL_PUBLIC=http://localhost:5647/graphql-public
VITE_TRANSLATIONS_URL=/locales
```

If the changes are not reflected, clear cache or disable cache and try again.

### SQL Database

- run SQL Server in a container and dotnet tool

```bash
docker compose -f docker-compose.yaml --env-file .env.dev -p caropticom-cn up azure-sql-edge dotnet-tool --build --remove-orphans
```

- connect to dotnet-tool container

```bash
docker compose -f docker-compose.yaml --env-file .env.dev -p caropticom-cn exec dotnet-tool /bin/bash
```

- restore backup

```bash
sqlpackage /Action:Import /SourceFile:"/app/mssql/backup/Prospects.bacpac" /TargetConnectionString:"Server=tcp:azure-sql-edge,1433;Initial Catalog=Prospects;Persist Security Info=False;User ID=SA;Password=Admin_123Password;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Connection Timeout=30;"
```

- create backup

```bash
sqlpackage /Action:Export /TargetFile:'/app/mssql/backup/Prospects.bacpac' /SourceEncryptConnection:false /p:VerifyExtraction=true /SourceServerName:azure-sql-edge /SourceDatabaseName:Prospects /SourceUser:SA /SourcePassword:'Admin_123Password'
```


from local machine connections string to SQL database will be `Server=tcp:localhost,1434;Initial Catalog=Prospects;Persist Security Info=False;User ID=SA;Password=Admin_123Password;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Connection Timeout=30;`

where
- 1434 is a port defined in .env.dev file
- Prospects is a database name
- SA is a user
- Admin_123Password is a password defined in .env.dev file


### Self-signed certificate

Before start necessary generate self-signed certificated.
More detail in an official [docs](https://learn.microsoft.com/en-us/dotnet/core/additional-tools/self-signed-certificates-guide#with-openssl)

```text
#!/bin/bash

PARENT="dev"

openssl req \
-x509 \
-newkey rsa:4096 \
-sha256 \
-days 365 \
-nodes \
-keyout $PARENT.key \
-out $PARENT.crt \
-subj "/CN=${PARENT}" \
-extensions v3_ca \
-extensions v3_req \
-config <( \
  echo '[req]'; \
  echo 'default_bits= 4096'; \
  echo 'distinguished_name=req'; \
  echo 'x509_extension = v3_ca'; \
  echo 'req_extensions = v3_req'; \
  echo '[v3_req]'; \
  echo 'basicConstraints = CA:FALSE'; \
  echo 'keyUsage = nonRepudiation, digitalSignature, keyEncipherment'; \
  echo 'subjectAltName = @alt_names'; \
  echo '[ alt_names ]'; \
  echo "DNS.1 = www.localhost"; \
  echo "DNS.2 = localhost"; \
  echo "DNS.3 = www.caropticom-api"; \
  echo "DNS.4 = caropticom-api"; \
  echo "DNS.5 = www.caropticom-notification"; \
  echo "DNS.6 = caropticom-notification"; \
  echo "DNS.7 = www.caropticom-optipix-webhooks-api"; \
  echo "DNS.8 = caropticom-optipix-webhooks-api"; \
  echo "DNS.9 = www.caropticom-optipix-webhooks-fileprocessor"; \
  echo "DNS.10 = caropticom-optipix-webhooks-fileprocessor"; \
  echo "DNS.11 = www.caropticom-frontend"; \
  echo "DNS.12 = caropticom-frontend"; \
  echo '[ v3_ca ]'; \
  echo 'subjectKeyIdentifier=hash'; \
  echo 'authorityKeyIdentifier=keyid:always,issuer'; \
  echo 'basicConstraints = critical, CA:TRUE, pathlen:0'; \
  echo 'keyUsage = critical, cRLSign, keyCertSign'; \
  echo 'extendedKeyUsage = serverAuth, clientAuth')

openssl x509 -noout -text -in $PARENT.crt

openssl pkcs12 -export -out $PARENT.pfx -inkey $PARENT.key -in $PARENT.crt
```

```bash
mkdir certs && cd certs
chmod +x certs.sh
./certs.sh

sudo security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/System.keychain-db dev1.crt

dotnet dev-certs https
dotnet dev-certs https --trust
dotnet dev-certs https --trust --check
```

`HTTPS_CERT_PATH` in .env.dev should be path to a directory with generated certificates

## DevOps

This is a temporary solution to build and deploy application to Azure Container Registry and Azure Container Apps. The final solution will be implemented in CI/CD.

### Build and push Docker image

```bash
az login
az acr login -n acrcaropticomwesteuropedev002
```

- build Frontend image

```bash
cd frontend && \
docker buildx build --platform linux/amd64,linux/arm64 --push -t acrcaropticomwesteuropedev002.azurecr.io/caropticom-frontend:0.0.3-dev -t acrcaropticomwesteuropedev002.azurecr.io/caropticom-frontend:latest -f Dockerfile .
```