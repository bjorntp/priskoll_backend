#!/bin/bash
set -e

# Define variables
BRANCH="production_frontend"
BUILD_DIR="frontend_systemet/dist"
BUILD_DIR_CONTENT="frontend_systemet/dist/*"
REPO=$(git rev-parse --show-toplevel)

# Ensure we're in the frontend directory
cd "$REPO/frontend_systemet"
git add .
git commit -m "Build files in dev"

# Ensure build directory exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: Build directory '$BUILD_DIR' does not exist."
  exit 1
fi

# Switch to the production branch
git checkout "$BRANCH"

# Remove old files, but keep .git
find . -mindepth 1 ! -name '.git' -exec rm -rf {} +

# Copy built files to the branch root
mkdir -p "$BUILD_DIR" # Ensure directory exists before checkout
git checkout main -- "$BUILD_DIR"

if [ -d "$BUILD_DIR" ]; then
  mv "$BUILD_DIR_CONTENT" .
  rm -rf "$BUILD_DIR"
else
  echo "Error: '$BUILD_DIR' does not exist after checkout."
  exit 1
fi

# Add and commit the changes
git add .
git commit -m "Deploy static files"

# Push to the remote branch
git push

# Return to the main branch
git checkout main
