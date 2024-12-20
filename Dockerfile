# Node.js 기반 이미지 사용
FROM node:18

# 작업 디렉터리 설정
WORKDIR /usr/src/app-server

# pnpm 설치
RUN npm install -g pnpm

# 의존성 파일 복사
COPY package*.json ./

# pnpm으로 의존성 설치
RUN pnpm install

# Prisma Migrate 실행 (데이터베이스 연결을 위한 마이그레이션 적용)
RUN npx prisma migrate deploy

# .env 파일을 Docker 이미지에 복사
COPY .env .env

# 애플리케이션 빌드
RUN pnpm run build

# 애플리케이션 포트 설정
EXPOSE 3001

# 애플리케이션 실행
CMD ["pnpm", "run", "start:prod"]
