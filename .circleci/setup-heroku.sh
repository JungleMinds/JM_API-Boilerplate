#!/bin/bash

mkdir -p ~/.ssh
touch ~/.ssh/config
chmod 600 ~/.ssh/config

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
EOF

cat >> ~/.ssh/config << EOF
  VerifyHostKeyDNS yes
  StrictHostKeyChecking no
EOF
