# Contributing Guide

This repository is a monorepo containing three independent projects:
- **fumadocs/**: Next.js documentation site
- **starlight/**: Astro documentation site
- **tools/**: React+Vite utility application

## Prerequisites

- **Node.js**: 20.x or later (24.x for starlight)
- **pnpm**: 10.22.0 (specified in package.json)
- **uv**: Latest version (for pre-commit)
- **pre-commit**: 4.4.0 (installed via uv)

## Getting Started

### 1. Install Dependencies

Each project has its own dependencies. Install them separately:

```bash
# Install fumadocs dependencies
cd fumadocs && pnpm install

# Install starlight dependencies
cd starlight && pnpm install

# Install tools dependencies
cd tools && pnpm install
```

### 2. Set Up Pre-commit Hooks

Pre-commit hooks are configured per-project but share the same Git repository. Install them with:

```bash
# Install in fumadocs
cd fumadocs && pnpm run prepare

# Install in starlight
cd starlight && pnpm run prepare

# Install in tools
cd tools && pnpm run prepare
```

**Manual installation** (if prepare script fails):

```bash
cd fumadocs && pre-commit install --hook-type pre-commit --hook-type commit-msg
cd starlight && pre-commit install --hook-type pre-commit --hook-type commit-msg
cd tools && pre-commit install --hook-type pre-commit --hook-type commit-msg
```

## Code Quality Tools

All projects use the following tools for code quality:

### Biome

**Biome** is a fast, modern linter and formatter that replaces ESLint + Prettier.

- **Configuration**: `biome.json` in each project directory
- **Run linting**: `pnpm lint`
- **Run formatting**: `pnpm format`
- **Fix issues automatically**: Pre-commit hooks run Biome with `--write` flag

### TypeScript

Type checking ensures type safety across all projects.

- **Run type check**: `pnpm typecheck`
- **fumadocs & tools**: Uses `tsc --noEmit`
- **starlight**: Uses `astro check`

### Pre-commit Hooks

Pre-commit hooks run automatically before each commit and enforce:

1. **Standard checks**: JSON/YAML validation, trailing whitespace, large files
2. **Secret scanning**: Gitleaks detects accidentally committed secrets
3. **Spell checking**: Codespell checks for typos in code and documentation
4. **Biome**: Linting and formatting
5. **Type checking**: TypeScript/Astro validation
6. **Commit message linting**: Enforces conventional commits

**Run manually**:
```bash
# Run all hooks
cd fumadocs && pre-commit run --all-files

# Run specific hook
cd fumadocs && pre-commit run biome-check --all-files
```

**Bypass hooks** (use sparingly):
```bash
git commit --no-verify -m "message"
```

## Commit Message Format

This repository follows [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Scopes

- `starlight`: Changes specific to the starlight project
- `fumadocs`: Changes specific to the fumadocs project
- `tools`: Changes specific to the tools project
- `deps`: Dependency updates
- `ci`: CI/CD changes
- `config`: Configuration changes

### Examples

```bash
# Good commit messages
git commit -m "feat(starlight): add dark mode toggle"
git commit -m "fix(fumadocs): resolve navigation issue on mobile"
git commit -m "docs(tools): update README with usage examples"
git commit -m "chore(deps): update dependencies across all projects"

# Bad commit messages (will be rejected)
git commit -m "updated stuff"
git commit -m "Fix bug"
git commit -m "WIP"
```

## Development Workflow

### Working on a Project

```bash
# Start development server
cd <project> && pnpm dev

# Run linting
pnpm lint

# Run formatting
pnpm format

# Run type checking
pnpm typecheck

# Run all checks
pnpm check

# Build for production
pnpm build
```

### Available Scripts

Each project has these npm scripts:

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `lint` | Run Biome linting |
| `format` | Run Biome formatting with auto-fix |
| `typecheck` | Run TypeScript type checking |
| `check` | Run lint + typecheck |
| `prepare` | Install pre-commit hooks |

## CI/CD

### GitHub Actions Workflows

#### CI Pipeline (`.github/workflows/ci.yml`)

Runs on every PR and push to main/master:

1. **Quality checks**: Run pre-commit hooks on all files
2. **Build verification**: Build all three projects in parallel
3. **Type checking**: Run TypeScript/Astro checks in parallel
4. **Security audit**: Run pnpm audit (on push only)

#### Claude Code (`.github/workflows/claude.yml`)

Allows interactive engagement with Claude Code via:
- Issue comments containing `@claude`
- PR review comments containing `@claude`
- Issue titles/bodies containing `@claude`

#### Claude Code Review (`.github/workflows/claude-code-review.yml`)

Automatically reviews PRs with:
- Code quality feedback
- Pre-commit compliance checks
- Performance and security analysis
- Test coverage recommendations

### Workflow Tips

- **Path filtering**: Workflows only run when relevant files change
- **Concurrency**: Old workflow runs are cancelled when new commits are pushed
- **Caching**: pnpm dependencies and pre-commit environments are cached for speed

## Troubleshooting

### Pre-commit Hook Failures

**Problem**: Hooks fail on commit

**Solution**:
1. Review the error message carefully
2. Fix the issues reported
3. Run `pre-commit run --all-files` to verify fixes
4. Commit again

**Common issues**:
- **Biome errors**: Run `pnpm format` to auto-fix formatting issues
- **Type errors**: Run `pnpm typecheck` to see detailed errors
- **Commit message**: Ensure it follows conventional commit format
- **Secrets detected**: Remove sensitive data before committing

### Pre-commit Hook Installation Issues

**Problem**: Hooks not running

**Solution**:
```bash
# Re-install hooks
cd <project>
pre-commit uninstall
pre-commit install --hook-type pre-commit --hook-type commit-msg

# Verify installation
pre-commit run --all-files
```

### Biome Configuration Issues

**Problem**: Biome reports unexpected errors

**Solution**:
1. Check `biome.json` configuration
2. Ensure `@biomejs/biome@2.3.5` is installed
3. Run `pnpm format` before committing
4. Check file patterns in `.pre-commit-config.yaml`

### Type Checking Failures

**Problem**: Type errors in pre-commit

**Solution**:
1. Run `pnpm typecheck` directly to see detailed errors
2. Fix type issues in your code
3. Ensure all dependencies are installed
4. Check `tsconfig.json` configuration

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Biome Documentation](https://biomejs.dev/)
- [Pre-commit Documentation](https://pre-commit.com/)
- [pnpm Documentation](https://pnpm.io/)

## Need Help?

- Open an issue for bugs or feature requests
- Ask questions in PR comments
- Tag `@claude` in issues for interactive assistance
