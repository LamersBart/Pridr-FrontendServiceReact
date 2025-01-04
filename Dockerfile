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

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create required directories with correct permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    chmod -R 775 /var/cache/nginx && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d

# Copy the build output to nginx-html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Set the user as non-root
USER appuser

# Expose the port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
