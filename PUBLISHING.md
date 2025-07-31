# Publishing Guide

This document outlines the process for publishing the WYSIWYG Editor library to npm.

## Prerequisites

1. **NPM Account**: Ensure you have an npm account and are logged in

   ```bash
   npm login
   ```

2. **NPM Token**: For automated publishing, set up an NPM_TOKEN secret in GitHub Actions

3. **Repository Access**: Ensure you have write access to the repository

## Pre-Publishing Checklist

### 1. Run Package Validation

```bash
npm run check-package
```

This will verify:

- ✅ All required package.json fields are present
- ✅ Build output exists and is valid
- ✅ Documentation files are present
- ✅ No common packaging issues

### 2. Run Tests

```bash
npm test
```

Ensure all tests pass before publishing.

### 3. Build the Library

```bash
npm run build
```

This creates the distribution files in the `dist/` directory.

### 4. Test Installation

```bash
npm run test:installation
```

This creates a test project and verifies the library can be installed and used.

## Publishing Process

### Option 1: Manual Publishing (Recommended for first-time)

1. **Update Version and Changelog**

   ```bash
   # For patch version (bug fixes)
   npm run release:patch

   # For minor version (new features)
   npm run release:minor

   # For major version (breaking changes)
   npm run release:major
   ```

   This will:

   - Bump the version in package.json
   - Update CHANGELOG.md with the new version
   - Create a git commit and tag
   - Push changes to the repository

2. **Edit the Changelog**
   After running the release command, edit `CHANGELOG.md` to add specific changes for the new version.

3. **Publish to NPM**
   ```bash
   npm run publish:manual
   ```

### Option 2: Automated Publishing via GitHub Actions

1. **Push a Version Tag**

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

   This will trigger the automated publishing workflow.

2. **Manual Trigger via GitHub Actions**
   - Go to the Actions tab in GitHub
   - Select "Publish to NPM" workflow
   - Click "Run workflow"
   - Choose the version type (patch/minor/major)

## Version Strategy

This project follows [Semantic Versioning](https://semver.org/):

- **PATCH** (0.0.X): Bug fixes and small improvements
- **MINOR** (0.X.0): New features that don't break existing functionality
- **MAJOR** (X.0.0): Breaking changes

## Files Included in Package

The following files are included in the npm package (see `.npmignore`):

- `dist/` - Built library files
- `README.md` - Documentation
- `LICENSE` - License file
- `package.json` - Package metadata

## Troubleshooting

### Common Issues

1. **Build Errors**

   - Ensure all dependencies are installed: `npm ci`
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Test Failures**

   - Run tests individually to identify issues: `npm run test:watch`
   - Check for TypeScript errors: `npm run build:types`

3. **Publishing Errors**
   - Verify npm login: `npm whoami`
   - Check package name availability: `npm view @prmargas/react-wysiwyg-editor`
   - Ensure version hasn't been published: Check npm registry

### Validation Failures

If `npm run check-package` fails:

1. **Missing Files**: Ensure `npm run build` completed successfully
2. **Version Issues**: Check that version follows semver format
3. **Documentation**: Ensure README.md and LICENSE exist and have content

## Post-Publishing

1. **Verify Publication**

   ```bash
   npm view @prmargas/react-wysiwyg-editor
   ```

2. **Test Installation**

   ```bash
   npm install @prmargas/react-wysiwyg-editor
   ```

3. **Update Documentation**
   - Update README.md with new version info
   - Update examples if API changed
   - Consider updating demo applications

## Security

- Never commit npm tokens or credentials
- Use GitHub Secrets for automated publishing
- Regularly audit dependencies: `npm audit`
- Keep devDependencies up to date

## Support

For issues with publishing:

1. Check this guide first
2. Run the validation scripts
3. Check GitHub Actions logs for automated publishing
4. Contact the maintainer if issues persist
