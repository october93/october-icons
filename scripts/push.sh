#!/usr/bin/env bash

echo "push changes to https://github.com/${TRAVIS_REPO_SLUG}"

# Travis operates in a detached mode. Harmonize travis commits in current branch
head_ref=$(git rev-parse HEAD)
git rebase $TRAVIS_BRANCH
git checkout $TRAVIS_BRANCH
git merge --ff-only $head_ref

git push https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git $TRAVIS_BRANCH --follow-tags > /dev/null 2>&1

echo "patching version.."

npm version patch
