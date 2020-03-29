#Start from the pre-existing official Docker Node image (v6.11.5)
FROM node:6.11.5 
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /api
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
COPY . /api/package.json 
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY . /api/
#opens port 5000 on tcp for the React front end. Link to connect: tcp://localhost:5000/
EXPOSE 5000/tcp
#Same as running in console
CMD ["npm", "start"]

