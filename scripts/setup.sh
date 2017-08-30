#!/usr/bin/env bash


  echo "setting up git"

  git config --global user.email $DEVOPS_EMAIL
  git config --global user.name "October DevOps"

  if [ "$COMMITTER_EMAIL" != "$DEVOPS_EMAIL" ]; then

  echo "push changes to https://github.com/${TRAVIS_REPO_SLUG}"

  # Travis operates in a detached mode. Harmonize travis commits in current branch
  head_ref=$(git rev-parse HEAD)
  git rebase $TRAVIS_BRANCH
  git checkout $TRAVIS_BRANCH
  git merge --ff-only $head_ref
  echo "building..."

  yarn generate
  echo "committing..."

  git commit -am "auto-build"

  npm version patch
  git push https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git $TRAVIS_BRANCH --follow-tags > /dev/null 2>&1

  echo "patching version.."

fi
