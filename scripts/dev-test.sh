#!/bin/bash
# Run unit tests related to changed files
# Detects vitest vs jest per project automatically.
#
# Usage:
#   pnpm dev:test          # Test changes in HEAD only (staged + unstaged)
#   pnpm dev:test --main   # Test all changes since origin/main

set -e

# Parse arguments
EXPLICIT_MAIN=false
COMPARE_TO_MAIN=false
for arg in "$@"; do
  case $arg in
    --main)
      EXPLICIT_MAIN=true
      COMPARE_TO_MAIN=true
      shift
      ;;
  esac
done

# Get all changed files, then derive JS/TS subset
if [ "$COMPARE_TO_MAIN" = true ]; then
  CHANGED_ALL=$(git diff --name-only --diff-filter=d origin/main...HEAD || true)
  echo "Comparing against origin/main..."
else
  CHANGED_ALL=$( { git diff --name-only --diff-filter=d HEAD; git diff --name-only --diff-filter=d --cached; } | sort -u | grep -v '^$' || true)
  echo "Checking HEAD changes only (use --main for full branch comparison)..."
fi

CHANGED_FILES=$(echo "$CHANGED_ALL" | grep -E '\.(js|jsx|ts|tsx)$' || true)

# Fallback when there are no changes in HEAD/staged
if [ -z "$CHANGED_ALL" ] && [ "$EXPLICIT_MAIN" = false ]; then
  echo "No HEAD changes, falling back to origin/main comparison..."
  CHANGED_ALL=$(git diff --name-only --diff-filter=d origin/main...HEAD || true)
  CHANGED_FILES=$(echo "$CHANGED_ALL" | grep -E '\.(js|jsx|ts|tsx)$' || true)
  COMPARE_TO_MAIN=true
fi

if [ -z "$CHANGED_FILES" ]; then
  echo "No JS/TS files changed"
  exit 0
fi

# Filter to only files that exist on disk
CHANGED_FILES=$(echo "$CHANGED_FILES" | while IFS= read -r f; do [ -f "$f" ] && echo "$f" || true; done)

if [ -z "$CHANGED_FILES" ]; then
  echo "No JS/TS files to test (all changed files were deleted)"
  exit 0
fi

# Extract unique project paths (apps/X or libs/X)
PROJECTS=$(echo "$CHANGED_FILES" | sed -E 's#^((apps|libs)/[^/]+)/.*#\1#' | sort -u)

for proj in $PROJECTS; do
  if [ -d "$proj" ]; then
    echo "Running unit tests for $proj..."
    # Get files changed in this project (relative to project root)
    PKG_FILES=$(echo "$CHANGED_FILES" | grep "^$proj/" | cut -d'/' -f3- | tr '\n' ' ')

    if [ -f "$proj/vite.config.ts" ] || [ -f "$proj/vite.config.js" ] || [ -f "$proj/vitest.config.ts" ]; then
      # Vitest project
      (cd "$proj" && echo "$PKG_FILES" | xargs npx vitest related --run --passWithNoTests) || {
        echo "❌ Tests failed in $proj"
        exit 1
      }
    elif [ -f "$proj/jest.config.ts" ] || [ -f "$proj/jest.config.js" ]; then
      # Jest project - use findRelatedTests
      ABSOLUTE_FILES=$(echo "$CHANGED_FILES" | grep "^$proj/" | while IFS= read -r f; do echo "$(pwd)/$f"; done | tr '\n' ' ')
      npx jest --findRelatedTests $ABSOLUTE_FILES --passWithNoTests || {
        echo "❌ Tests failed in $proj"
        exit 1
      }
    else
      echo "Skipping $proj (no test config found)"
    fi
  fi
done

echo "✅ Tests passed"
