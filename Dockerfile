# use NodeJS image
FROM node:16-alpine3.16

# Workdir
WORKDIR /bookshelf-platform

# Copy project
COPY  . .

# 4. Install library based on package.json
RUN npm install

ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000

# run server
CMD ["npm", "run", "start:prod"]