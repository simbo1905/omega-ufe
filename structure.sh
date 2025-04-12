#!/bin/bash
# filepath: /Users/Shared/omega-µfe/structure.sh

# Set the project root directory
PROJECT_ROOT="$(pwd)"

echo "Project structure for: $PROJECT_ROOT"
echo "--------------------------------"

# Use find to list all files, excluding .git directory
find "$PROJECT_ROOT" -type f -not -path "*/\.git/*" -not -path "*/node_modules/*" | sort

echo "--------------------------------"
echo "Structure generated on: $(date)"
