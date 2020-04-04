#Start from the pre-existing official Docker Node image (v6.11.5)
<<<<<<< HEAD
FROM node:13.12.0
=======
FROM node:10.19.0-alpine3.10
>>>>>>> 99a47002e61efbdf497c4a7e8e34d0afecdbc7cf
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /usr/local/bin/api
#Copies package.json from host into "WORKDIR/api". Docker caches this step so that 
#subsequent builds with the same package.json are faster
#"*" is wildcard to match package.json wherever it is found. Necessary because
#Heroku will look in ROOT FOLDER instead of WORKDIR /client for it after deploying the image! (so DUMB!)
COPY package*.json /usr/local/bin/api/
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install 
#Copies the rest of the app's source code into the image's filesystem
COPY . /usr/local/bin/api/
# Make port 5000 available to the world outside this container through both tcp and udp. Default if unspecified is TCP
EXPOSE 5000
EXPOSE 80
#Same as running in console
CMD ["npm", "start"]

