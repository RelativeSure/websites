#!/usr/bin/env bash

# Install git hooks via pre-commit for a given project directory, unless running
# inside CI or Cloudflare build environments where we skip hook installation.

set -euo pipefail

PROJECT_DIR="${1:-}"

if [[ -z "${PROJECT_DIR}" ]]; then
  echo "Usage: $0 <project-directory>" >&2
  exit 1
fi

if [[ -n "${CI:-}" || -n "${CF_PAGES:-}" || -n "${CLOUDFLARE:-}" || -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "Skipping pre-commit install for ${PROJECT_DIR} inside CI/Cloudflare environment"
  exit 0
fi

if ! command -v pre-commit >/dev/null 2>&1; then
  echo "pre-commit not found; skipping hook install for ${PROJECT_DIR}" >&2
  echo "Install pre-commit (https://pre-commit.com) to enable git hooks." >&2
  exit 0
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${REPO_ROOT}"
pre-commit install --hook-type pre-commit --hook-type commit-msg -C "${PROJECT_DIR}"
