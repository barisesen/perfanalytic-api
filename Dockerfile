FROM node:10
RUN apt update && apt install -y netcat
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start