#Start from the pre-existing official DOcker Node image (v6.11.5)
#MANDATORY!
FROM node:6.11.5
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /usr/src/app
#Does what it says: Copies package.json from host into image filesystem
COPY package.json .
#Run 'npm install' builds the package in the image's filesystem
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY . .
#Metadata that specifies how to run a container based on this image
#Here, that is by using 'npm start' in the console!
CMD [ "npm", "start" ]

