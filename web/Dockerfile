#Start from the latest pre-existing official Docker Node image
FROM node:13.12.0
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
#"/usr/local/bin/" is what Heroku takes as the "root" folder. Files MUST be added here
#or they cannot be found!
WORKDIR /usr/local/bin/web
#Copies package.json from host into image filesystem. Docker caches this step so that 
#subsequent builds with the same package.json are faster
#"*" is wildcard to match package.json wherever it is found. Necessary because
COPY package*.json /usr/local/bin/web/
#Run 'npm install' builds the package in the image's filesystem. 
RUN npm install 
#Copies the rest of the app's source code into the image's filesystem
COPY . /usr/local/bin/web/

#Builds the React app
RUN npm run build 

EXPOSE 6000
#Runs the app when container launches. Same as running in console
CMD ["npm", "start"]

