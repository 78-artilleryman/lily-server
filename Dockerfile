# Node.js 기반 이미지 사용 (Node.js 18 버전)
FROM node:18

# 컨테이너 내부의 작업 디렉터리를 /app으로 설정
WORKDIR /app

# package.json과 package-lock.json 파일을 컨테이너로 복사
COPY package*.json ./

# 프로젝트 의존성 패키지 설치
RUN npm install

# NestJS CLI 전역 설치
RUN npm install -g @nestjs/cli

# 현재 디렉터리의 모든 소스 파일을 컨테이너로 복사
COPY . .

# 환경 설정 파일 복사
COPY .env .env

# Prisma 데이터베이스 마이그레이션 실행
RUN npx prisma migrate deploy

# 프로덕션용 빌드 실행
RUN npm run build

# 애플리케이션 실행 명령어 설정 (프로덕션 모드)
CMD ["npm", "run", "start:prod"]