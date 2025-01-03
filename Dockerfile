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
FROM nginx:stable-alpine AS production-stage
# Maak een niet-root gebruiker
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Kopieer de build-output naar de nginx-html-map
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Stel de gebruiker in als niet-root gebruiker
USER appuser
# Stel poort in
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
