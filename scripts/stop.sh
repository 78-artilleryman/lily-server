#!/bin/bash

# 실행 중인 도커 컨테이너 중지
docker stop $(docker ps -a -q) 2>/dev/null || true

# 중지된 컨테이너 삭제
docker rm $(docker ps -a -q) 2>/dev/null || true

# 사용하지 않는 이미지 삭제 (선택사항)
docker image prune -af 2>/dev/null || true

exit 0 