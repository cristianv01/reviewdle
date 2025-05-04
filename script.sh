#!/bin/bash

echo "# reviewdle" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/cristianv01/reviewdle.git
git push -u origin main