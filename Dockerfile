# Node.js 기반 이미지 사용
FROM node:18

# 작업 디렉터리 설정
RUN mkdir -p /usr/src/app-server
WORKDIR /usr/src/app-server

# pnpm 설치
RUN npm install -g pnpm

COPY . .

COPY .env .env

# pnpm으로 의존성 설치
RUN pnpm install

# Prisma Migrate 실행 (데이터베이스 연결을 위한 마이그레이션 적용)
RUN npx prisma migrate deploy

# 애플리케이션 빌드
RUN pnpm run build

# 애플리케이션 포트 설정
EXPOSE 3001

# 애플리케이션 실행
CMD ["node", "pnpm", "run", "dist/main.js", "start:prod"]
