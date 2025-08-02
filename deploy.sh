#!/bin/bash

# Build the project for custom domain
echo "Building the project for custom domain uplab.dev..."
npm run build

# Create .nojekyll file to disable Jekyll processing
touch out/.nojekyll

# Create CNAME file for custom domain
echo "uplab.dev" > out/CNAME

# Initialize git in the out directory if not already initialized
cd out
if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/Himanshu-u-rai/Uplab.git
fi

# Add all files and commit
git add .
git commit -m "Deploy to GitHub Pages with custom domain - $(date)"

# Push to gh-pages branch
git push origin HEAD:gh-pages --force

echo "Deployment complete! Your site will be available at https://uplab.dev/"
