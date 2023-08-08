FROM node:latest
WORKDIR /c/Users/Rakesh Kumar Sahoo/Desktop/dpdzero_assignment/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]