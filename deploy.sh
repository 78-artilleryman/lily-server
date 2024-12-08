#!/bin/bash

# 배포 로그 기록
echo "> 현재 실행 중인 Docker 컨테이너 pid 확인" >> /home/ubuntu/deploy.log
CURRENT_PID=$(sudo docker container ls -q)

# 이미 실행 중인 컨테이너가 있으면 중지
if [ -z "$CURRENT_PID" ]
then
  echo "> 현재 구동 중인 Docker 컨테이너가 없으므로 종료하지 않습니다." >> /home/ubuntu/deploy.log
else
  echo "> sudo docker stop $CURRENT_PID"  # 현재 구동 중인 Docker 컨테이너가 있으면 중지
  sudo docker stop $CURRENT_PID
  sleep 5
fi

# Nest 프로젝트 디렉터리로 이동
cd /home/ubuntu/app

# Docker 이미지 빌드 (Nest.js 프로젝트의 Dockerfile을 사용하여)
sudo docker build -t nest-api-docker .

# Docker 컨테이너 실행 (3001번 포트에 Nest.js 애플리케이션 실행)
echo "> Docker 컨테이너를 3001번 포트로 실행 중..." >> /home/ubuntu/deploy.log
sudo docker run -d -p 3001:3001 nest-api-docker

echo "> 배포 완료!" >> /home/ubuntu/deploy.log
