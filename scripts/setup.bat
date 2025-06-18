@echo off
echo 🚀 Setting up Campus Connect Insight CI/CD Pipeline
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 20+ first.
    pause
    exit /b 1
)

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the application
echo 🔨 Building application...
call npm run build

REM Build Docker image
echo 🐳 Building Docker image...
docker build -t campus-connect-insight .

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Update sonar-project.properties with your SonarCloud organization
echo 2. Add GitHub secrets:
echo    - SONAR_TOKEN
echo    - VERCEL_TOKEN
echo    - VERCEL_ORG_ID
echo    - VERCEL_PROJECT_ID
echo 3. Push to GitHub to trigger the CI/CD pipeline
echo.
echo To run locally with monitoring:
echo docker-compose up --build
echo.
echo To run just the app:
echo docker run -p 3000:80 campus-connect-insight
pause 