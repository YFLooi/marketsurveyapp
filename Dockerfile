#Start from the pre-existing official Docker Node image (v6.11.5) or use the lighter mhart/alpine-node:8.11.4
FROM node:6.11.5
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /api
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
#"*" is wildcard to match package.json wherever it is found. Necessary because
#Heroku will look in ROOT FOLDER instead of WORKDIR /client for it after deploying the image! (so DUMB!)
COPY api/package*.json api/
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY api/ api/
# Make port 5000 available to the world outside this container. tcp is default
EXPOSE 5000

#2nd FROM statement builds on 1st one
FROM node:6.11.5
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /client
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
#"*" is wildcard to match package.json wherever it is found. Necessary because
#Heroku will look in ROOT FOLDER instead of WORKDIR /client for it after deploying the image! (so DUMB!)
COPY client/package*.json client/
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY client/ client/
# Make port 3000 available to the world outside this container. tcp is default
EXPOSE 3000
