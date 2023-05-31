FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /goit-node-hw-02
COPY . .
RUN npm install --production
CMD ["node", "/test-superhero-backend/app.js"]