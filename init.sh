#!/bin/bash


# Ask for Google Maps API Key
read -p "Enter Google Maps API Key: " GOOGLE_MAPS_API_KEY

# Ask for API URL with a default value
read -p "Enter API URL [default: http://localhost:3000/]: " API_URL
API_URL=${API_URL:-http://localhost:3000/}

# Create .env file in ./frontend directory
FRONTEND_ENV_FILE="./frontend/.env"
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=\"$GOOGLE_MAPS_API_KEY\"" > $FRONTEND_ENV_FILE
echo "NEXT_PUBLIC_API_URL=\"$API_URL\"" >> $FRONTEND_ENV_FILE

echo ".env file created in ./frontend directory."

# Navigate to backend directory and run bunx drizzle-kit push
cd ./backend || { echo "Backend directory not found!"; exit 1; }
echo "Running 'bun install and bunx drizzle-kit push' in backend..."
bun i
bunx drizzle-kit push

# Navigate to frontend directory and run bunx drizzle-kit push
cd ../frontend || { echo "Backend directory not found!"; exit 1; }
echo "Running 'bun install' in frontend..."
bun i

echo "Operation completed."
