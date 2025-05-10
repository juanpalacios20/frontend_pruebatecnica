
FROM node:20-alpine AS builder

WORKDIR /app


COPY vite-project/package.json vite-project/package-lock.json ./


RUN npm install --legacy-peer-deps


COPY vite-project/ .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



