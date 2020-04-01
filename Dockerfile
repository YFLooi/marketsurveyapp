#Start from the pre-existing official Docker Node image (v6.11.5) or use the lighter mhart/alpine-node:8.11.4
FROM node:6.11.5
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /app
#Copy into root folder
COPY api/package.json .
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install
#Copies the rest of the app's source code into the image's filesystem
COPY api .
# Make port 5000 available to the world outside this container. tcp is default
EXPOSE 5000

#2nd FROM statement builds on 1st one
#Copy into a client folder in WORKDIR
COPY client/package.json client/
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install --prefix client/
#Copies the rest of the app's source code into the image's filesystem
COPY client/ client/
