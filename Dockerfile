FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
# The server speaks MCP over stdio.
ENTRYPOINT ["npx", "tsx", "src/index.ts"]
