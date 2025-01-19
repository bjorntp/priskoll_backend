#!/bin/bash
set -e

# Define variables
BRANCH="production_frontend"
BUILD_DIR="dist"
REPO=$(git rev-parse --show-toplevel)

# Ensure we're in the frontend directory
cd "$REPO/frontend_systemet"

# Switch to the production branch
git checkout $BRANCH

# Clean the branch
git rm -rf .

# Copy built files to the branch root
cp -r $BUILD_DIR/* $REPO/

# Add and commit the changes
git add .
git commit -m "Deploy static files"

# Push to the remote branch
git push origin $BRANCH

# Return to the main branch
git checkout main
