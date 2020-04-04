#Start from the pre-existing official Docker Node image (v6.11.5)
FROM node:10.19.0-alpine3.10
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /usr/local/bin/app

#Copy entire source code into WORKDIR
COPY . /usr/local/bin/app/

#Mimic "heroku-postbuild": "npm install && cd client && npm install && npm run build"
#Run in root folder
RUN npm install --prefix /usr/local/bin/app/
#Run in client folder
RUN npm install --prefix /usr/local/bin/app/client 
#Run in client folder
RUN npm build --prefix /usr/local/bin/app/client 

#Same as running in console
CMD ["npm", "start"]

