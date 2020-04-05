#Start from the pre-existing official Docker Node image (v6.11.5)
FROM node:13.12.0
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
# Make port 6000. Default if unspecified is TCP
EXPOSE 6000

ENV HTTP_PROXY "http://localhost:6000"
ENV HTTPS_PROXY "https://localhost:6000"

#Same as running in console
CMD ["npm", "start"]

