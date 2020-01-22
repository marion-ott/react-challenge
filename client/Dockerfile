FROM node:alpine
WORKDIR /home/node
COPY package*.json ./
RUN npm install
COPY . .
# exemple variable d'environnement de type process.env en front
# ARG BACKEND_URL
# ENV REACT_APP_BACKEND_URL=${BACKEND_URL}
# dans la commande de build rajouter : --build-arg=BACKEND_URL=http://url:port
EXPOSE 3000
RUN npm run build

FROM nginx:alpine
COPY --from=0 /home/node/build /usr/share/nginx/html