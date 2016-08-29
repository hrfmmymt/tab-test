#!/bin/bash
set -e

git config user.email "hrfmmymt@gmail.com"
git config user.name "hrfmmymt"

git checkout gh-pages
git add .
git merge master
git push --force --quiet "https://${GH_TOKEN}@github.com/hrfmmymt/tab-test.git" master:gh-pages > /dev/null 2>&1