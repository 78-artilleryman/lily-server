#!/bin/sh

# 필수 패키지 설치
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Docker GPG 키 추가
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Docker 리포지토리 추가
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

# Docker 설치
sudo apt-get install -y docker-ce

# 현재 사용자에게 Docker 권한 추가
sudo usermod -aG docker "${USER}"

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Docker Compose 실행 권한 부여
sudo chmod +x /usr/local/bin/docker-compose
