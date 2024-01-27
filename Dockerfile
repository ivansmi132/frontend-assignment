FROM node:20 as builder
COPY . /final-frontend-blog

WORKDIR /final-frontend-blog

RUN npm ci
RUN npm run build


FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /final-frontend-blog/build /usr/share/nginx/html


