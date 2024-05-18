#!/bin/bash

JWT_KEY=$(openssl rand -hex 32)
MONGO_PASSWORD=$(openssl rand -hex 32)

echo "Please enter the container name:"
read CONTAINER_NAME

# Copy .env.sample to .env
cp .env.sample .env

# Replace JWT_KEY in .env with the value we just found
sed -i "s/JWT_KEY=.*$/JWT_KEY=$JWT_KEY/" .env
sed -i "s/password/$MONGO_PASSWORD/" .env

docker run --name $CONTAINER_NAME -d -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD \
      mongo