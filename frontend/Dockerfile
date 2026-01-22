# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app/frontend

COPY ./frontend/package*.json ./
RUN npm ci

COPY ./frontend/ ./
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:stable-alpine AS runtime

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
