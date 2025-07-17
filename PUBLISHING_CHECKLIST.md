# Publishing Checklist

This checklist ensures all publishing requirements are met before releasing the WYSIWYG Editor library.

## ✅ Pre-Publishing Requirements

### 1. Package Configuration
- [x] **package.json** properly configured with all required fields
- [x] **Version** follows semantic versioning (currently 0.1.0)
- [x] **Main entry points** configured (ESM, CJS, Types)
- [x] **Files array** specifies what gets published
- [x] **Peer dependencies** properly set for React
- [x] **Keywords** added for discoverability
- [x] **Repository** and **license** information included

### 2. Build System
- [x] **Library build** creates proper distribution files
- [x] **TypeScript declarations** generated correctly
- [x] **CSS bundling** works for standalone distribution
- [x] **Source maps** generated for debugging

### 3. Documentation
- [x] **README.md** comprehensive with usage examples
- [x] **LICENSE** file present (MIT)
- [x] **CHANGELOG.md** follows Keep a Changelog format
- [x] **PUBLISHING.md** guide for maintainers

### 4. Quality Assurance
- [x] **Package validation** script (`npm run check-package`)
- [x] **Installation testing** script (`npm run test:installation`)
- [x] **Build validation** (`npm run validate`)
- [x] **Pre-publish hooks** configured

### 5. Publishing Automation
- [x] **GitHub Actions** workflow for automated publishing
- [x] **Version management** scripts (patch/minor/major)
- [x] **Changelog automation** on version bumps
- [x] **Git tagging** and push automation

### 6. Security & Distribution
- [x] **.npmignore** configured to exclude dev files
- [x] **Content sanitization** for published package
- [x] **Access control** set to public
- [x] **Scoped package** name (@prmargas/react-wysiwyg-editor)

## 🚀 Publishing Commands

### Manual Publishing (Recommended for first release)
```bash
# 1. Validate package
npm run check-package

# 2. Test installation
npm run test:installation

# 3. Create release (choose one)
npm run release:patch    # Bug fixes (0.1.0 → 0.1.1)
npm run release:minor    # New features (0.1.0 → 0.2.0)
npm run release:major    # Breaking changes (0.1.0 → 1.0.0)

# 4. Edit CHANGELOG.md with specific changes

# 5. Publish to npm
npm run publish:manual
```

### Automated Publishing
```bash
# Push version tag to trigger GitHub Actions
git tag v0.1.0
git push origin v0.1.0
```

## 📋 Final Verification

Before publishing, verify:

1. **Package builds successfully**: `npm run build`
2. **All validations pass**: `npm run check-package`
3. **Installation works**: `npm run test:installation`
4. **Version is correct**: Check package.json
5. **Changelog is updated**: Check CHANGELOG.md
6. **Git is clean**: No uncommitted changes
7. **NPM login**: `npm whoami` shows correct user

## 🔧 Scripts Available

| Script | Purpose |
|--------|---------|
| `npm run check-package` | Validate package configuration |
| `npm run test:installation` | Test library installation in external project |
| `npm run validate` | Run linting and build validation |
| `npm run update-changelog` | Update changelog with current version |
| `npm run release:patch` | Bump patch version and update changelog |
| `npm run release:minor` | Bump minor version and update changelog |
| `npm run release:major` | Bump major version and update changelog |
| `npm run publish:manual` | Publish to npm registry |

## 🛡️ Security Notes

- NPM_TOKEN secret configured in GitHub Actions
- No sensitive information in published package
- Peer dependencies prevent version conflicts
- Content sanitization prevents malicious code

## 📦 Package Contents

The published package includes:
- `dist/` - Built library files (ESM, CJS, CSS)
- `dist/types/` - TypeScript declaration files
- `README.md` - Usage documentation
- `LICENSE` - MIT license
- `package.json` - Package metadata

## ✅ Ready for Publishing

All requirements have been met. The package is ready for publishing to npm.

**Current Status**: ✅ READY
**Next Step**: Run `npm run release:patch` to create first release