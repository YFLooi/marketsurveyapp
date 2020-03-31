#Start from the pre-existing official Docker Node image (v6.11.5)
FROM mhart/alpine-node:8.11.4 AS base
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
WORKDIR /app
#Copies the rest of the app's source code into the image's filesystem
COPY . .

FROM base AS api
COPY --from=dependencies api ./api  
RUN npm install
EXPOSE 5000/tcp
EXPOSE 5000/udp

FROM base AS client
COPY --from=dependencies client ./client  
RUN npm install
RUN npm test
EXPOSE 3000/tcp
EXPOSE 3000/udp

CMD ["npm", "start"]
