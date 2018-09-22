#!/usr/bin/env bash

echo "setting up git"

git config --global user.email $DEVOPS_EMAIL
git config --global user.name "October DevOps"

yarn generate && yarn copy-svgs

echo "patching version.."

npm version patch
