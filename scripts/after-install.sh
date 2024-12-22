#!/bin/bash

CONTAINER_NAME=lily-server
IMAGE_NAME=lily-server

# Navigate to the directory of your Dockerfile if not the current directory
cd /home/ubuntu/app/

# Stop and remove the existing container if it's already running
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Build the Docker image
docker build -t $IMAGE_NAME .

# Remove dangling images from previous builds
docker image prune -f

# Run the new Docker container
docker run -d --name $CONTAINER_NAME -p 3001:3001 $IMAGE_NAME