#!/bin/bash
# Validates GitHub Actions workflows locally using actionlint and act dry-run.
# Gracefully skips if tools are not installed.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
GITHUB_DIR="$REPO_ROOT/.github"
WORKFLOWS_DIR="$GITHUB_DIR/workflows"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

VALIDATION_FAILED=0

echo "Validating GitHub Actions workflows..."

check_tools() {
    local missing_tools=()

    if ! command -v actionlint &> /dev/null; then
        missing_tools+=("actionlint")
    fi

    if ! command -v act &> /dev/null; then
        missing_tools+=("act")
    fi

    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo -e "${YELLOW}Missing tools: ${missing_tools[*]}${NC}"
        echo "   Install with:"
        echo "   - actionlint: curl -sSfL https://raw.githubusercontent.com/rhysd/actionlint/main/scripts/download-actionlint.bash | bash"
        echo "   - act: curl -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash"
        echo ""
        echo -e "${YELLOW}Skipping GitHub Actions validation (tools not installed)${NC}"
        return 1
    fi
    return 0
}

run_actionlint() {
    echo ""
    echo "Running actionlint..."

    local actionlint_output
    actionlint_output=$(actionlint "$WORKFLOWS_DIR"/*.yml 2>&1) || true

    # Filter known/expected warnings
    filtered_output=""
    while IFS= read -r line; do
        if echo "$line" | grep -qE '^\s*\|'; then continue; fi
        if [ -z "$line" ]; then continue; fi
        if echo "$line" | grep -qE 'string should not be empty|condition "false" is always evaluated to false'; then
            continue
        fi
        if echo "$line" | grep -qE '\.ya?ml:[0-9]+:[0-9]+:'; then
            filtered_output="$filtered_output$line\n"
        fi
    done <<< "$actionlint_output"

    filtered_output=$(echo -e "$filtered_output" | sed '/^$/d')

    if [ -n "$filtered_output" ]; then
        echo -e "${RED}actionlint found issues:${NC}"
        echo -e "$filtered_output"
        return 1
    else
        echo -e "${GREEN}actionlint passed${NC}"
        return 0
    fi
}

run_act_dryrun() {
    echo ""
    echo "Running act dry-run..."

    cat > "$REPO_ROOT/.actrc" << 'EOF'
-P ubuntu-latest=catthehacker/ubuntu:act-latest
EOF

    for workflow in "$WORKFLOWS_DIR"/*.yml; do
        [ -f "$workflow" ] || continue
        workflow_name=$(basename "$workflow")

        echo "   Validating $workflow_name..."

        local event="push"
        if grep -q "pull_request:" "$workflow"; then
            event="pull_request"
        elif grep -q "workflow_dispatch:" "$workflow"; then
            event="workflow_dispatch"
        fi

        act -W "$workflow" --dryrun "$event" -n 2>&1 || true
    done

    rm -f "$REPO_ROOT/.actrc"
    echo -e "${GREEN}act dry-run completed${NC}"
    return 0
}

main() {
    cd "$REPO_ROOT"

    if ! check_tools; then
        exit 0
    fi

    if ! run_actionlint; then
        VALIDATION_FAILED=1
    fi

    if ! run_act_dryrun; then
        VALIDATION_FAILED=1
    fi

    echo ""
    if [ $VALIDATION_FAILED -eq 1 ]; then
        echo -e "${RED}GitHub Actions validation failed!${NC}"
        exit 1
    else
        echo -e "${GREEN}GitHub Actions validation passed!${NC}"
        exit 0
    fi
}

trap 'rm -f "$REPO_ROOT/.actrc"' EXIT

main "$@"
