#!/bin/bash
# Lint only changed JS/TS files (compare against origin/main to include all branch commits)

set -e

# Get changed JS/TS files
CHANGED_FILES=$(git diff --name-only --diff-filter=d origin/main...HEAD | grep -E '\.(js|jsx|ts|tsx)$' || true)

# Filter to only files that exist on disk
CHANGED_FILES=$(echo "$CHANGED_FILES" | while IFS= read -r f; do [ -f "$f" ] && echo "$f" || true; done)

if [ -z "$CHANGED_FILES" ]; then
  echo "No JS/TS files to lint"
  exit 0
fi

echo "Linting changed files..."
echo "$CHANGED_FILES" | xargs npx eslint

echo "✅ Lint passed"
