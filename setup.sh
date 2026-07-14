#!/bin/bash

# Setup script for development environment

echo "🚀 AI-Smart-Tender-Management Setup"
echo "===================================="

# Check prerequisites
echo "✓ Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed (optional)"
fi

echo "✅ Prerequisites met"

# Create .env files
echo "📝 Creating environment files..."

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
fi

if [ ! -f ai-service/.env ]; then
    cp ai-service/.env.example ai-service/.env
    echo "✅ Created ai-service/.env"
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Setup AI service
echo "📦 Setting up AI service..."
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo "✅ AI service setup complete"
else
    echo "❌ Failed to setup AI service"
    exit 1
fi
deactivate
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm start"
echo "4. Start AI service: cd ai-service && source venv/bin/activate && python app.py"
echo ""
echo "Or use Docker:"
echo "docker-compose -f deployment/docker-compose.yml up --build"
