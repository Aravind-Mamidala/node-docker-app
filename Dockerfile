FROM node:18

WORKDIR /app

# Copy package files and node_modules installed on host
COPY package*.json ./
#install required dependencies
RUN npm install
#COPY node_modules ./node_modules

# Copy rest of the source code
COPY . .

CMD ["npm", "start"]

