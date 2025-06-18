#!/bin/bash

echo "🚀 Setting up Campus Connect Insight CI/CD Pipeline"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t campus-connect-insight .

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update sonar-project.properties with your SonarCloud organization"
echo "2. Add GitHub secrets:"
echo "   - SONAR_TOKEN"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_ORG_ID"
echo "   - VERCEL_PROJECT_ID"
echo "3. Push to GitHub to trigger the CI/CD pipeline"
echo ""
echo "To run locally with monitoring:"
echo "docker-compose up --build"
echo ""
echo "To run just the app:"
echo "docker run -p 3000:80 campus-connect-insight" 