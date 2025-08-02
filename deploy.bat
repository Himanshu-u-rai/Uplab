@echo off
echo Building the project...
call npm run build

echo Creating .nojekyll file...
echo. > out\.nojekyll

echo Initializing git repository...
cd out
if not exist ".git" (
    git init
    git remote add origin https://github.com/Himanshu-u-rai/Uplab.git
)

echo Adding files and committing...
git add .
git commit -m "Deploy to GitHub Pages - %date% %time%"

echo Pushing to gh-pages branch...
git push origin HEAD:gh-pages --force

echo Deployment complete!
pause
