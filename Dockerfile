#Start from the pre-existing official Docker Node image (v6.11.5)
#"as build-deps" names the image as build-deps. Useful when configuring the production environment later
FROM node:6.11.5 as build-deps
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR usr/src/app
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
COPY package.json ./
#opens port 5000 for the React front end
EXPOSE 5000
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY . ./
#Same as running in console
CMD ["npm", "start"]

