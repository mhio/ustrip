#!/usr/bin/env bash
set -ue
rundir=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)")
cd "$rundir"

# Custom run:

CONTAINER_NAME="ustrip"
IMAGE_NAME="${CONTAINER_NAME}"
IMAGE_REPO="me/${IMAGE_NAME}"
IMAGE_TAG="latest"

run:nodemon () {
  nodemon -x "docker stop "${CONTAINER_NAME}";
   ./make.sh build \
   && ./make.sh docker"
}

run:build () {
  docker build --tag "${IMAGE_REPO}:${IMAGE_TAG}" .
}

run:docker () {
  docker run --tty \
   --env DEBUG=true \
   --rm \
   --name "${CONTAINER_NAME}" \
   "${IMAGE_REPO}:${IMAGE_TAG}" \
   "$@"
  #docker inspect "${CONTAINER_NAME}" | jq -r '.[0].NetworkSettings.IPAddress'
}

run:pages () {
  BUILD_ENV=pages yarn build
  current_commit=$(git show --oneline -s)
  cd dist
  git init
  git add -A
  git config --local user.name "mhio"
  git config --local user.email "37205532+mhio@users.noreply.github.com"
  git commit -m "deploy static build from $current_commit"
  git push -f https://github.com/mhio/ustrip.git main:gh-pages
} 

# Common run:

run:help(){
  set +x
  echo "Commands:"
  declare -F | awk '/^declare -f run:/ { printf("  %s\n", substr($0,16)); }'
}

if [ -n "${1:-}" ]; then
  cmd=$1
  shift
else
  cmd=help
fi

set -x

run:$cmd "$@"

