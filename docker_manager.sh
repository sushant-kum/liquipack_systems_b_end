#!/bin/sh

CONTAINER_NAME="liquipack/back_end"
readonly CONTAINER_NAME
CONTAINER_PORT=8080
readonly CONTAINER_PORT
HOST_PORT=8080
readonly HOST_PORT

getStatus() {
  CONTAINER_ID=$(docker ps -a | grep -v Exit | grep $CONTAINER_NAME | awk '{print $1}')
  if [ -z $CONTAINER_ID ] ; then
    echo 'Not running.'
    return 1
  else
    echo "Running in container: $CONTAINER_ID"
    return 0
  fi
}

case "$1" in
  build)
    docker build -t $CONTAINER_NAME .
    ;;
  start)
    docker ps -a | grep -v Exit | grep -q $CONTAINER_NAME
    if [ $? -ne 0 ]; then
        CONTAINER_ID=$(docker run -p $CONTAINER_PORT:$HOST_PORT -d $CONTAINER_NAME)
    fi
    getStatus
    ;;

  status)
    getStatus
    ;;

  stop)
    CONTAINER_ID=$(docker ps -a | grep -v Exit | grep $CONTAINER_NAME | awk '{print $1}')
    if [ -n $CONTAINER_ID ] ; then
      SRV=$(docker stop $CONTAINER_ID)
      SRV=$(docker rm $CONTAINER_ID)
      if [ $? -eq 0 ] ; then
        echo 'Stopped.'
      fi
    else
      echo 'Not Running.'
      exit 1
    fi
    ;;

  remove)
    IMAGE_ID=$(docker images -a | grep -v Exit | grep $CONTAINER_NAME | awk '{print $3}')
    if [ -z $IMAGE_ID ] ; then
      echo 'No Image Found.'
      exit 1
    else
      docker rmi $IMAGE_ID
    fi
    ;;

  ps)
    CONTAINER_ID=$(docker ps -a | grep -v Exit | grep $CONTAINER_NAME | awk '{print $1}')
    if [ -z $CONTAINER_ID ] ; then
      echo 'Not Running.'
      exit 1
    else
      docker ps -a | grep -v Exit | grep $CONTAINER_NAME
    fi
    ;;

  logs)
    CONTAINER_ID=$(docker ps -a | grep -v Exit | grep $CONTAINER_NAME | awk '{print $1}')
    if [ -z $CONTAINER_ID ] ; then
      echo 'Not Running.'
      exit 1
    else
      docker logs -f $CONTAINER_ID
    fi
    ;;

  *)
    echo "Docker Container Name: $CONTAINER_NAME"
    echo "Options accepted:"
    echo "\tbuild\t\t Build docker image"
    echo "\tstart\t\t Start docker image"
    echo "\tstop\t\t Stop running docker image"
    echo "\tremove\t\t Remove docker image"
    echo "\tstatus\t\t Get container status"
    echo "\tps\t\t Get container ID"
    echo "\tlogs\t\t Show logs in --follow mode"
    exit 1
    ;;
esac
