#!/bin/bash
npm build

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "travis@domain.com"

cat .gitignore
echo "node_modules" > .gitignore
cat .gitignore

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add -A
git commit -m "Deploy to Heroku"
echo "Success!"