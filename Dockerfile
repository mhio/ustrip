FROM docker.io/node:14.16.0-slim AS build

WORKDIR /app/

COPY package.json yarn.lock /app/
RUN set -uex; \
    yarn install;

COPY . /app/
RUN set -uex; \
    yarn build; \
    node -e 'let p = require("/app/package.json"); console.log("%j", { data: { ok: true, name: p.name, version: p.version } })' > /app/dist/healthz; \
    cat /app/dist/healthz;


FROM docker.io/nginx:1.18
WORKDIR /app
COPY server.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/. /app/dist/
RUN cp /app/dist/index.html /app/dist/404.html;
EXPOSE 5000
CMD [ "nginx" ]
