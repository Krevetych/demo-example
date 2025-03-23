FROM node:23 

WORKDIR /app 

COPY . . 

EXPOSE 8080 

CMD ["sh", "-c", "node src/server.js"]

# docker build -t my-app -f Dockerfile.app .
# docker run --network my-network --name app-img -d --restart unless-stopped -p 8080:8080 my-app
