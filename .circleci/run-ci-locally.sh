#!/usr/bin/env bash
if [ $# -le 1 ]
  then
    echo "Please add args <commit hash> and  <Branch>"
    exit 1
fi
 
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=$1\
    --form config=config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/JungleMinds/JM_API-Boilerplate/tree/$2
