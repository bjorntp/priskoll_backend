#!/bin/bash
# set -e

# Define variables
BRANCH="production_frontend"
BUILD_DIR="frontend_systemet/dist"
BUILD_DIR_CONTENT="frontend_systemet/dist/*"
REPO=$(git rev-parse --show-toplevel)

# Ensure we're in the frontend directory
cd "$REPO/frontend_systemet"
git add .
git commit -m "Build files in dev"

# Switch to the production branch
git checkout "production_frontend"

rm -r *

# Copy built files to the branch root
git checkout main -- $BUILD_DIR
mv $BUILD_DIR_CONTENT .
rm -r frontend_systemet/

# Add and commit the changes
git add .
git commit -m "Deploy static files"

# Push to the remote branch
git push

# Return to the main branch
git checkout main
