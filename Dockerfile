#Start from the pre-existing official Docker Node image (v6.11.5) or use the lighter mhart/alpine-node:8.11.4
FROM node:6.11.5 
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /client
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
COPY package.json /client/
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY . /client/
# Make port 3000 available to the world outside this container
EXPOSE 3000
#Runs the app when container launches. Same as running in console
CMD ["npm", "start"]

#Start from the pre-existing official Docker Node image (v6.11.5)
FROM node:6.11.5 
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /api
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
COPY package.json /api/
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY . /api/
#opens port 5000 for the React front end
EXPOSE 5000
#Same as running in console
CMD ["npm", "start"]


