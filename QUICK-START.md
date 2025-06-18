# 🚀 Quick Start Guide

Get your Campus Connect Insight CI/CD pipeline running in 5 minutes!

## Prerequisites

- ✅ Node.js 20+
- ✅ Docker Desktop
- ✅ GitHub Account
- ✅ SonarCloud Account (free)
- ✅ Vercel Account (free)

## Step 1: Local Setup

### Windows
```cmd
scripts\setup.bat
```

### Mac/Linux
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

## Step 2: GitHub Setup

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add CI/CD pipeline"
   git push origin main
   ```

2. **Add GitHub Secrets** (Repository → Settings → Secrets):
   - `SONAR_TOKEN` - From SonarCloud
   - `VERCEL_TOKEN` - From Vercel
   - `VERCEL_ORG_ID` - From Vercel
   - `VERCEL_PROJECT_ID` - From Vercel

## Step 3: External Services

### SonarCloud (2 minutes)
1. Go to [SonarCloud](https://sonarcloud.io)
2. Sign up with GitHub
3. Create project for your repo
4. Get token from Account → Security → Tokens
5. Update `sonar-project.properties` with your org name

### Vercel (2 minutes)
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repo
3. Get tokens from Account → Tokens
4. Get IDs from project settings

## Step 4: Test Everything

```bash
# Test locally
docker-compose up --build

# Check services:
# App: http://localhost:3000
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001 (admin/admin)
```

## Step 5: Trigger Pipeline

Make any change and push:
```bash
echo "Test" >> README.md
git add README.md
git commit -m "Test CI/CD"
git push origin main
```

Check GitHub Actions tab to see the pipeline running! 🎉

## What You Get

✅ **Automated Testing** - Every push runs tests  
✅ **Code Quality** - SonarCloud analysis  
✅ **Docker Images** - Automatically built and pushed  
✅ **Auto Deployment** - Deployed to Vercel  
✅ **Monitoring** - Prometheus + Grafana  
✅ **CI/CD Pipeline** - Complete automation  

## Need Help?

- 📖 [Full Setup Guide](docs/CI-CD-SETUP.md)
- 🐛 [Troubleshooting](docs/CI-CD-SETUP.md#troubleshooting)
- 📧 Create an issue in the repo

## Next Steps

1. Add real tests to replace placeholder
2. Configure custom SonarCloud rules
3. Set up Slack notifications
4. Add performance monitoring
5. Create staging environment 