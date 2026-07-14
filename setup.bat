@echo off
REM Setup script for development environment (Windows)

echo 🚀 AI-Smart-Tender-Management Setup
echo ====================================

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    exit /b 1
)

REM Check Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed
    exit /b 1
)

echo ✅ Prerequisites met

REM Create .env files
echo 📝 Creating environment files...

if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo ✅ Created backend\.env
)

if not exist "ai-service\.env" (
    copy "ai-service\.env.example" "ai-service\.env"
    echo ✅ Created ai-service\.env
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
echo ✅ Backend dependencies installed
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..

REM Setup AI service
echo 📦 Setting up AI service...
cd ai-service
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to setup AI service
    exit /b 1
)
echo ✅ AI service setup complete
call venv\Scripts\deactivate.bat
cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📖 Next steps:
echo 1. Update backend\.env with your database credentials
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. Start frontend: cd frontend ^&^& npm start
echo 4. Start AI service: cd ai-service ^&^& venv\Scripts\activate.bat ^&^& python app.py
echo.
echo Or use Docker:
echo docker-compose -f deployment/docker-compose.yml up --build
