# Build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
# Kopieer package files
COPY package.json package-lock.json vite.config.js index.html .env ./
# Kopieer bronbestanden
COPY src ./src
COPY public ./public
# Installeer afhankelijkheden en Bouw de React-app
RUN npm install --ignore-scripts
RUN npm run build || exit 1

RUN ls -l /app

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
