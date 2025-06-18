# CI/CD Pipeline Setup Guide

This document provides step-by-step instructions for setting up the complete CI/CD pipeline for Campus Connect Insight.

## Overview

The CI/CD pipeline includes:
- **GitHub Actions** for automation
- **Docker** for containerization
- **SonarCloud** for code quality analysis
- **Prometheus** for monitoring
- **Vercel** for deployment

## Prerequisites

1. **GitHub Account** with repository access
2. **SonarCloud Account** (free tier available)
3. **Vercel Account** (free tier available)
4. **Docker** installed locally for testing

## Step 1: GitHub Repository Setup

1. **Fork or create** a new GitHub repository
2. **Clone** the repository locally
3. **Push** the code to GitHub

```bash
git clone https://github.com/your-username/campus-connect-insight.git
cd campus-connect-insight
git add .
git commit -m "Initial commit with CI/CD setup"
git push origin main
```

## Step 2: SonarCloud Configuration

### 2.1 Create SonarCloud Account

1. Go to [SonarCloud](https://sonarcloud.io)
2. Sign up with your GitHub account
3. Create a new organization (if needed)

### 2.2 Create SonarCloud Project

1. Click "Create New Project"
2. Choose "GitHub" as the provider
3. Select your repository
4. Choose "Other" for the analysis method
5. Get your project key and organization name

### 2.3 Update Configuration

Update `sonar-project.properties`:

```properties
sonar.projectKey=your-project-key
sonar.organization=your-organization-name
```

### 2.4 Get SonarCloud Token

1. Go to your SonarCloud account settings
2. Navigate to "Security" → "Tokens"
3. Generate a new token
4. Copy the token (you'll need it for GitHub secrets)

## Step 3: Vercel Configuration

### 3.1 Connect Repository to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3.2 Get Vercel Tokens and IDs

1. **Vercel Token**:
   - Go to Vercel account settings
   - Navigate to "Tokens"
   - Create a new token

2. **Organization ID**:
   - Go to your Vercel dashboard
   - Check the URL: `https://vercel.com/teams/[org-id]/projects`
   - Copy the `org-id`

3. **Project ID**:
   - Go to your project settings in Vercel
   - Find the "Project ID" field

## Step 4: GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret:

| Secret Name | Value |
|-------------|-------|
| `SONAR_TOKEN` | Your SonarCloud token |
| `VERCEL_TOKEN` | Your Vercel deployment token |
| `VERCEL_ORG_ID` | Your Vercel organization ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |

## Step 5: Test the Pipeline

### 5.1 Trigger the Pipeline

1. Make a small change to your code
2. Commit and push to the `main` branch:

```bash
echo "# Test commit" >> README.md
git add README.md
git commit -m "Test CI/CD pipeline"
git push origin main
```

### 5.2 Monitor the Pipeline

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. You should see the CI/CD workflow running
4. Monitor each job:
   - **test**: Runs linting and tests
   - **sonarcloud**: Performs code quality analysis
   - **docker-build**: Builds and pushes Docker image
   - **deploy-vercel**: Deploys to Vercel

## Step 6: Local Testing

### 6.1 Test Docker Build

```bash
# Build the Docker image
docker build -t campus-connect-insight .

# Run the container
docker run -p 3000:80 campus-connect-insight

# Access the application
open http://localhost:3000
```

### 6.2 Test with Monitoring Stack

```bash
# Start all services (app + Prometheus + Grafana)
docker-compose up --build

# Access services:
# - App: http://localhost:3000
# - Prometheus: http://localhost:9090
# - Grafana: http://localhost:3001 (admin/admin)
```

## Step 7: Monitoring Setup

### 7.1 Prometheus Configuration

The `prometheus.yml` file is already configured to monitor:
- The application metrics
- System resources (if node-exporter is added)
- Nginx metrics (if nginx-exporter is added)

### 7.2 Grafana Dashboards

1. Access Grafana at `http://localhost:3001`
2. Login with `admin/admin`
3. Add Prometheus as a data source:
   - URL: `http://prometheus:9090`
   - Access: Server (default)
4. Create dashboards for:
   - Application metrics
   - System resources
   - Error rates

## Troubleshooting

### Common Issues

1. **GitHub Actions Fail**:
   - Check if all secrets are properly configured
   - Verify the workflow file syntax
   - Check the Actions tab for detailed error messages

2. **SonarCloud Analysis Fails**:
   - Verify the `SONAR_TOKEN` is correct
   - Check the `sonar-project.properties` configuration
   - Ensure the project key matches your SonarCloud project

3. **Vercel Deployment Fails**:
   - Verify all Vercel tokens and IDs
   - Check the build logs in Vercel dashboard
   - Ensure the `vercel.json` configuration is correct

4. **Docker Build Fails**:
   - Check if Docker is running
   - Verify the Dockerfile syntax
   - Check for missing dependencies

### Debug Commands

```bash
# Check Docker images
docker images

# Check running containers
docker ps

# View container logs
docker logs <container-id>

# Check GitHub Actions status
gh run list

# Test SonarCloud locally
sonar-scanner
```

## Next Steps

1. **Add Tests**: Implement unit and integration tests
2. **Security Scanning**: Add security vulnerability scanning
3. **Performance Testing**: Add performance benchmarks
4. **Slack Notifications**: Configure Slack notifications for deployments
5. **Environment Management**: Set up staging and production environments

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Review the SonarCloud analysis results
3. Check the Vercel deployment logs
4. Create an issue in the repository
5. Contact the development team

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SonarCloud Documentation](https://docs.sonarcloud.io)
- [Vercel Documentation](https://vercel.com/docs)
- [Prometheus Documentation](https://prometheus.io/docs)
- [Docker Documentation](https://docs.docker.com) 