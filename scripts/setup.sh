#!/bin/bash
# Setup script for Go WASM React Starter template
# Run after creating a repository from this template

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default module path in template
OLD_MODULE="github.com/user/go-wasm-react-starter"

echo "Go WASM React Starter - Project Setup"
echo "======================================"
echo ""

# Get new module path
if [ -n "$1" ]; then
    NEW_MODULE="$1"
else
    # Try to detect from git remote
    if git remote get-url origin &>/dev/null; then
        REMOTE_URL=$(git remote get-url origin)
        # Extract github.com/user/repo from various URL formats
        NEW_MODULE=$(echo "$REMOTE_URL" | sed -E 's#(git@|https://)##' | sed -E 's#:#/#' | sed -E 's#\.git$##')
        echo -e "Detected module path from git remote: ${GREEN}${NEW_MODULE}${NC}"
        read -p "Use this path? [Y/n] " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Nn]$ ]]; then
            NEW_MODULE=""
        fi
    fi

    if [ -z "$NEW_MODULE" ]; then
        read -p "Enter your Go module path (e.g., github.com/yourname/yourproject): " NEW_MODULE
    fi
fi

if [ -z "$NEW_MODULE" ]; then
    echo -e "${RED}Error: Module path is required${NC}"
    exit 1
fi

# Extract project name from module path (last segment)
PROJECT_NAME=$(basename "$NEW_MODULE")

echo ""
echo "Updating project..."

# Update go/go.mod
if [ -f "go/go.mod" ]; then
    sed -i.bak "s|$OLD_MODULE|$NEW_MODULE|g" go/go.mod
    rm -f go/go.mod.bak
    echo -e "  ${GREEN}✓${NC} go/go.mod"
fi

# Update go/wasm/go.mod
if [ -f "go/wasm/go.mod" ]; then
    sed -i.bak "s|$OLD_MODULE|$NEW_MODULE|g" go/wasm/go.mod
    rm -f go/wasm/go.mod.bak
    echo -e "  ${GREEN}✓${NC} go/wasm/go.mod"
fi

# Update go/wasm/main.go
if [ -f "go/wasm/main.go" ]; then
    sed -i.bak "s|$OLD_MODULE|$NEW_MODULE|g" go/wasm/main.go
    rm -f go/wasm/main.go.bak
    echo -e "  ${GREEN}✓${NC} go/wasm/main.go"
fi

# Update package.json name
if [ -f "package.json" ]; then
    # Use node/jq if available, otherwise sed
    if command -v node &>/dev/null; then
        node -e "
            const fs = require('fs');
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            pkg.name = '$PROJECT_NAME';
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
        "
    else
        sed -i.bak "s|\"name\": \"go-wasm-app\"|\"name\": \"$PROJECT_NAME\"|g" package.json
        rm -f package.json.bak
    fi
    echo -e "  ${GREEN}✓${NC} package.json"
fi

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. npm install"
echo "  2. npm run dev"
echo ""
echo -e "${YELLOW}Tip:${NC} Delete this script and the setup instructions in README.md"
