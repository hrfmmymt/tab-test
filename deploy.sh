#!/bin/bash
set -e
rm -rf public || exit 0;
mkdir public

# publicフォルダに開発用ファイルを展開する。
cp -r src/* public

cd public

git config user.email "hrfmmymt@gmail.com"
git config user.name "hrfmmymt"

git init
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/hrfmmymt/tab-test.git" master:gh-pages > /dev/null 2>&1