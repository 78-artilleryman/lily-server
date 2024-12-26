#!/bin/bash
cd /home/ubuntu/app

# .env 파일 로드
export $(cat /home/ubuntu/app/codedeploy.env | xargs)

# 도커 이미지 풀
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker pull $ECR_REGISTRY:$IMAGE_TAG

# 새 컨테이너 실행
docker run -d -p 80:3001 --name app $ECR_REGISTRY:$IMAGE_TAG 