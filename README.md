# Campus Connect Insight

A modern React application for campus insights and analytics with a full CI/CD pipeline and MongoDB backend.

## 🚀 Features

- Modern React with TypeScript
- Tailwind CSS for styling
- Comprehensive CI/CD pipeline (GitHub Actions)
- Docker containerization (frontend, backend, MongoDB, Prometheus, Grafana)
- SonarCloud code quality analysis
- Prometheus monitoring
- Vercel deployment
- **MongoDB backend with Express API**
- **JWT authentication**
- **User registration and login**

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Styling**: Tailwind CSS, Radix UI
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Code Quality**: SonarCloud
- **Monitoring**: Prometheus, Grafana
- **Deployment**: Vercel
- **Database**: MongoDB

## 📋 Prerequisites

- Node.js 20+
- Docker
- Git
- MongoDB (local or Atlas)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/campus-connect-insight.git
   cd campus-connect-insight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start MongoDB** (choose one):
   ```bash
   # Option 1: Local MongoDB
   docker run -d -p 27017:27017 --name mongodb mongo:7.0
   
   # Option 2: MongoDB Atlas (update .env with your connection string)
   ```

5. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start separately:
   # Terminal 1: npm run server
   # Terminal 2: npm run dev
   ```

6. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### Docker Development

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the services**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - MongoDB: `localhost:27017`
   - Prometheus: `http://localhost:9090`
   - Grafana: `http://localhost:3001` (admin/admin)

## 🔧 CI/CD Pipeline Setup

### 1. GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

- `SONAR_TOKEN`: Your SonarCloud token
- `VERCEL_TOKEN`: Your Vercel deployment token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

### 2. SonarCloud Setup

1. Create a SonarCloud account
2. Create a new project for this repository
3. Update `sonar-project.properties` with your organization name
4. Add the `SONAR_TOKEN` to GitHub secrets

### 3. Vercel Setup

1. Connect your GitHub repository to Vercel
2. Get your deployment tokens and IDs
3. Add them to GitHub secrets

### 4. MongoDB Setup

#### Local Development
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Or install MongoDB locally
```

#### Production (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update environment variables

## 📊 Monitoring

### Prometheus Configuration

The application includes Prometheus monitoring with:

- Application metrics collection
- System resource monitoring
- Custom business metrics
- MongoDB metrics

### Grafana Dashboards

Access Grafana at `http://localhost:3001` with:
- Username: `admin`
- Password: `admin`

## 🐳 Docker

### Build Docker Images

```bash
# Build frontend
docker build -t campus-connect-insight .

# Build backend
docker build -f Dockerfile.server -t campus-connect-insight-server .
```

### Run Docker Containers

```bash
# Run frontend
docker run -p 3000:80 campus-connect-insight

# Run backend
docker run -p 5000:5000 campus-connect-insight-server
```

### Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📝 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔍 Code Quality

This project uses SonarCloud for code quality analysis. The pipeline includes:

- Code coverage reporting
- Security vulnerability scanning
- Code smell detection
- Technical debt tracking

## 🚀 Deployment

### Automatic Deployment

The CI/CD pipeline automatically deploys to Vercel on:

- Push to `main` branch
- Pull request merges

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
campus-connect-insight/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utility functions & API
│   └── main.tsx       # Application entry point
├── server/
│   └── index.js       # Express server with MongoDB
├── public/            # Static assets
├── .github/           # GitHub Actions workflows
├── Dockerfile         # Frontend Docker configuration
├── Dockerfile.server  # Backend Docker configuration
├── docker-compose.yml # Docker Compose setup
├── prometheus.yml     # Prometheus configuration
├── vercel.json        # Vercel deployment config
└── sonar-project.properties # SonarCloud configuration
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Student Management
- `GET /api/student/:userId` - Get student details
- `POST /api/student` - Save/update student details
- `PUT /api/student/:userId/skills` - Update skills
- `PUT /api/student/:userId/subjects` - Update subjects

### Health Check
- `GET /api/health` - Server health status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-username/campus-connect-insight/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 CI/CD Pipeline Flow

1. **Code Push/PR** → Triggers GitHub Actions
2. **Testing** → Runs linting, tests, and server health check
3. **SonarCloud Analysis** → Code quality checks
4. **Docker Build** → Creates container images
5. **Vercel Deployment** → Deploys to production

## 📈 Monitoring Dashboard

Access monitoring dashboards:

- **Prometheus**: `http://localhost:9090`
- **Grafana**: `http://localhost:3001`
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `localhost:27017`
