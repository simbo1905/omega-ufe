#!/bin/bash

# Check if Repomix is installed
if ! command -v repomix &> /dev/null; then
    echo "Repomix is not installed. Installing now..."
    npm install -g repomix
fi

# Create a basic configuration file for TypeScript projects
cat > repomix.config.json << EOF
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "directoryStructure": true,
    "fileSummary": true,
    "showLineNumbers": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.json",
    "**/*.md"
  ],
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": [
      "node_modules",
      "dist",
      "build",
      "coverage"
    ]
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
EOF

# Run Repomix with the configuration
echo "Running Repomix on your TypeScript project..."
repomix --style xml --output repomix-output.xml

echo "Done! Your project has been packed into repomix-output.xml"
echo "You can now share this file with an AI assistant for code review or refactoring."
