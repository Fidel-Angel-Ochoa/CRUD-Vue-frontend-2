FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=10000

RUN npm install @vue/cli@5.0.8 -g

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . /app 

EXPOSE 10000

CMD ["npm", "run", "serve"]