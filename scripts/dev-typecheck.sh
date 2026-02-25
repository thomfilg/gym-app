#!/bin/bash
# Typecheck only changed TS/TSX files in affected projects

set -e

# Get changed TS files (compare against origin/main to include all branch commits)
CHANGED_FILES=$(git diff --name-only --diff-filter=d origin/main...HEAD | grep -E '\.(ts|tsx)$' || true)

# Filter to only files that exist on disk
CHANGED_FILES=$(echo "$CHANGED_FILES" | while IFS= read -r f; do [ -f "$f" ] && echo "$f" || true; done)

if [ -z "$CHANGED_FILES" ]; then
  echo "No TypeScript files changed"
  exit 0
fi

# Extract unique project paths (apps/X or libs/X)
PROJECTS=$(echo "$CHANGED_FILES" | sed -E 's#^((apps|libs)/[^/]+)/.*#\1#' | sort -u)

for proj in $PROJECTS; do
  if [ -d "$proj" ]; then
    # Determine the right tsconfig for typechecking
    if [ -f "$proj/tsconfig.app.json" ]; then
      TSCONFIG="tsconfig.app.json"
    elif [ -f "$proj/tsconfig.lib.json" ]; then
      TSCONFIG="tsconfig.lib.json"
    elif [ -f "$proj/tsconfig.json" ]; then
      TSCONFIG="tsconfig.json"
    else
      echo "Skipping $proj (no tsconfig found)"
      continue
    fi

    echo "Typechecking $proj (using $TSCONFIG)..."
    (cd "$proj" && npx tsc -p "$TSCONFIG" --noEmit)
  fi
done

echo "✅ Typecheck passed"
