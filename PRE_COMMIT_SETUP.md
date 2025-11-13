# Pre-commit Setup Guide

This document provides a quick reference for the pre-commit setup in this monorepo.

## Quick Setup

### For New Contributors

```bash
# 1. Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Install pre-commit
uv tool install pre-commit

# 3. Install dependencies in each project
cd fumadocs && pnpm install
cd ../starlight && pnpm install
cd ../tools && pnpm install

# 4. Install pre-commit hooks (automatically done by prepare script)
# Hooks will be installed when you run pnpm install in each project
```

### Manual Hook Installation

If the automatic installation doesn't work:

```bash
cd fumadocs && pre-commit install --hook-type pre-commit --hook-type commit-msg
cd ../starlight && pre-commit install --hook-type pre-commit --hook-type commit-msg
cd ../tools && pre-commit install --hook-type pre-commit --hook-type commit-msg
```

## What Gets Checked

### Per-Project Hooks

Each project has its own `.pre-commit-config.yaml` with these hooks:

1. **Standard Checks**
   - ✅ JSON/YAML validation
   - ✅ Merge conflict detection
   - ✅ Large file detection (>1MB)
   - ✅ Trailing whitespace removal
   - ✅ End-of-file fixer
   - ✅ Private key detection

2. **Security**
   - 🔒 **Gitleaks**: Scans for secrets, API keys, tokens

3. **Code Quality**
   - 🎨 **Biome**: Fast linting and formatting (replaces ESLint + Prettier)
   - 📝 **Codespell**: Spell checking for code and docs

4. **Type Safety**
   - 📦 **TypeScript**: Type checking (fumadocs, tools)
   - 🚀 **Astro Check**: Type checking for Astro files (starlight)

5. **Commit Messages**
   - 💬 **Commitlint**: Enforces conventional commit format

## Hook Execution Flow

```
git commit
    ↓
[Pre-commit Stage]
    ↓
    1. Check JSON/YAML ━━━━━━━━━━━━━━━━━━┓
    2. Check large files                  ┃
    3. Detect secrets (Gitleaks)          ┃  If any check fails,
    4. Spell check (Codespell)            ┃  commit is aborted
    5. Lint & format (Biome)              ┃
    6. Type check (TypeScript/Astro)      ┃
    ↓                                     ┃
[Commit-msg Stage]                        ┃
    ↓                                     ┃
    7. Validate commit message            ┃
    ↓                                     ┃
✅ Commit succeeds ←━━━━━━━━━━━━━━━━━━━━━┛
```

## Common Commands

### Running Hooks Manually

```bash
# Run all hooks on all files
cd fumadocs && pre-commit run --all-files

# Run specific hook
pre-commit run biome-check --all-files
pre-commit run check-json --all-files

# Run hooks on staged files only
pre-commit run
```

### Bypassing Hooks

⚠️ **Use sparingly** - only when you have a good reason!

```bash
# Skip pre-commit hooks
git commit --no-verify -m "feat(project): message"

# Skip both pre-commit and commit-msg hooks
git commit --no-verify --no-edit
```

### Updating Hooks

```bash
# Update to latest hook versions
cd fumadocs && pre-commit autoupdate

# Clean hook cache
pre-commit clean
```

## Versions

| Tool | Version | Repository |
|------|---------|------------|
| pre-commit | 4.4.0 | github.com/pre-commit/pre-commit |
| Biome | 2.3.5 | github.com/biomejs/biome |
| Gitleaks | v8.21.2 | github.com/gitleaks/gitleaks |
| Codespell | v2.4.1 | github.com/codespell-project/codespell |
| Commitlint | v9.23.0 | github.com/alessandrojcm/commitlint-pre-commit-hook |

## Configuration Files

| File | Purpose |
|------|---------|
| `fumadocs/.pre-commit-config.yaml` | Fumadocs pre-commit hooks |
| `starlight/.pre-commit-config.yaml` | Starlight pre-commit hooks |
| `tools/.pre-commit-config.yaml` | Tools pre-commit hooks |
| `commitlint.config.js` | Commit message rules (shared) |
| `fumadocs/biome.json` | Biome configuration for fumadocs |
| `starlight/biome.json` | Biome configuration for starlight |
| `tools/biome.json` | Biome configuration for tools |

## Troubleshooting

### Hooks Not Running

**Problem**: Pre-commit hooks don't execute on commit

**Solution**:
```bash
# Check if hooks are installed
ls -la .git/hooks/

# Reinstall hooks
cd <project>
pre-commit install --hook-type pre-commit --hook-type commit-msg

# Verify hooks
pre-commit run --all-files
```

### Biome Fails to Run

**Problem**: `biome-check` hook fails

**Solution**:
```bash
# Ensure Biome is installed
cd <project>
pnpm list @biomejs/biome

# If missing, install it
pnpm add -D @biomejs/biome@2.3.5

# Test Biome directly
npx biome check .
```

### Type Check Fails

**Problem**: TypeScript errors block commits

**Solution**:
```bash
# Run type check directly to see detailed errors
cd <project>
pnpm typecheck

# Fix the type errors
# Then commit again
```

### Gitleaks False Positives

**Problem**: Gitleaks detects secrets that aren't real

**Solution**:

Add a `.gitleaksignore` file to the project root:
```
# Ignore specific files
fumadocs/test-data.json

# Ignore specific findings by hash
abc123def456...
```

Or use inline ignore comments:
```javascript
const apiKey = "fake-key-for-testing"; // gitleaks:allow
```

### Commit Message Rejected

**Problem**: Commitlint rejects your commit message

**Common issues**:
- Missing type: `feat`, `fix`, `docs`, etc.
- Missing scope: Should be one of: `starlight`, `fumadocs`, `tools`, `deps`, `ci`, `config`
- Wrong format: Should be `type(scope): subject`

**Examples of valid messages**:
```bash
git commit -m "feat(starlight): add new page layout"
git commit -m "fix(fumadocs): resolve broken link in sidebar"
git commit -m "docs(tools): update README with new features"
git commit -m "chore(deps): bump dependencies"
```

## Performance Tips

### First-Time Run

The first time you run pre-commit, it needs to:
1. Download and install all hook dependencies
2. Set up virtual environments
3. Cache hook environments

This can take 2-5 minutes. Subsequent runs are much faster (seconds).

### Speed Optimization

Pre-commit automatically caches hook environments. You can see cached environments:

```bash
# View cache
ls ~/.cache/pre-commit

# Clear cache (if needed)
pre-commit clean
```

### File Scoping

Hooks are configured to only run on files within their respective project directories:
- Fumadocs hooks: Only check `fumadocs/**` files
- Starlight hooks: Only check `starlight/**` files
- Tools hooks: Only check `tools/**` files

This prevents cross-project interference and improves performance.

## Additional Information

- **Documentation**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for full development guide
- **CI/CD**: Pre-commit hooks also run in GitHub Actions (`.github/workflows/ci.yml`)
- **Biome**: See individual `biome.json` files for linting rules
- **Conventional Commits**: See [conventionalcommits.org](https://www.conventionalcommits.org/)
