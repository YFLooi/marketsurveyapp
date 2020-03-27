#Start from the pre-existing official Docker Node image (v6.11.5)
#"as build-deps" names the image as build-deps. Useful when configuring the production environment later
FROM node:6.11.5 as build-deps
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR usr/src/app
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
COPY package.json ./
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY . ./
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR usr/src/app/client
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
RUN npm build
#Metadata that specifies how to run a container based on this image
#Here, that is by using 'npm start' in the console!
#CMD [ "npm", "start" ]

