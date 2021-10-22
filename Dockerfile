FROM node:alpine

LABEL "author"="Himanshu Shekhar <himanshu.shekhar.in@gmail.com>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]