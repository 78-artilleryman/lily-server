#!/bin/bash

# Amazon Linux 패키지 업데이트
sudo yum update -y

# Docker 설치
sudo yum install -y docker

# Docker 서비스 시작
sudo service docker start

# ec2-user를 docker 그룹에 추가
sudo usermod -aG docker ec2-user

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Docker Compose 실행 권한 부여
sudo chmod +x /usr/local/bin/docker-compose

# AWS CLI 설치 (ECR 접근용)
sudo yum install -y aws-cli

# 스크립트 실행 권한 설정
sudo chmod +x /home/ec2-user/app/scripts/*.sh 