FROM node:22-alpine@sha256:16e22a550f3863206a3f701448c45f7912c6896a62de43add43bb9c86130c3e2

WORKDIR /app
COPY package.json server.js ./
COPY index.html styles.css app.js manifest.webmanifest service-worker.js ./
COPY assets ./assets
COPY icons ./icons

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health || exit 1

USER node
CMD ["node", "server.js"]
