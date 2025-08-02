@echo off
echo Building the project for custom domain uplab.dev...
call npm run build

echo Creating .nojekyll file...
echo. > out\.nojekyll

echo Creating CNAME file for custom domain...
echo uplab.dev > out\CNAME

echo Initializing git repository...
cd out
if not exist ".git" (
    git init
    git remote add origin https://github.com/Himanshu-u-rai/Uplab.git
)

echo Adding files and committing...
git add .
git commit -m "Deploy to GitHub Pages with custom domain - %date% %time%"

echo Pushing to gh-pages branch...
git push origin HEAD:gh-pages --force

echo Deployment complete! Your site will be available at https://uplab.dev/
pause
