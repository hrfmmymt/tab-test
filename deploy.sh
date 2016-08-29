#!/bin/bash
set -e

git config user.email "hrfmmymt@gmail.com"
git config user.name "hrfmmymt"

git init
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/hrfmmymt/tab-test.git" master:gh-pages > /dev/null 2>&1