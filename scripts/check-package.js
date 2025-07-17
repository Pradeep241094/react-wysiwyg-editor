#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Running pre-publish package validation...\n');

let hasErrors = false;
let hasWarnings = false;

function error(message) {
  console.log(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function warning(message) {
  console.log(`⚠️  WARNING: ${message}`);
  hasWarnings = true;
}

function success(message) {
  console.log(`✅ ${message}`);
}

// Check package.json
console.log('📦 Checking package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Required fields
const requiredFields = ['name', 'version', 'description', 'main', 'module', 'types', 'author', 'license'];
requiredFields.forEach(field => {
  if (!packageJson[field]) {
    error(`Missing required field: ${field}`);
  } else {
    success(`Required field present: ${field}`);
  }
});

// Check version format
const versionRegex = /^\d+\.\d+\.\d+(-[\w\d\-]+)?$/;
if (!versionRegex.test(packageJson.version)) {
  error(`Invalid version format: ${packageJson.version}`);
} else {
  success(`Valid version format: ${packageJson.version}`);
}

// Check files array
if (!packageJson.files || packageJson.files.length === 0) {
  error('Missing or empty "files" array in package.json');
} else {
  success(`Files array configured with ${packageJson.files.length} entries`);
}

// Check dist directory exists
console.log('\n📁 Checking build output...');
if (!fs.existsSync('dist')) {
  error('dist directory does not exist. Run "npm run build" first.');
} else {
  success('dist directory exists');
  
  // Check for main files
  const mainFiles = [
    packageJson.main,
    packageJson.module,
    packageJson.types
  ].filter(Boolean);
  
  mainFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      error(`Main file does not exist: ${file}`);
    } else {
      success(`Main file exists: ${file}`);
    }
  });
}

// Check README
console.log('\n📖 Checking documentation...');
if (!fs.existsSync('README.md')) {
  error('README.md does not exist');
} else {
  const readme = fs.readFileSync('README.md', 'utf8');
  if (readme.length < 100) {
    warning('README.md seems very short');
  } else {
    success('README.md exists and has content');
  }
}

// Check LICENSE
if (!fs.existsSync('LICENSE')) {
  error('LICENSE file does not exist');
} else {
  success('LICENSE file exists');
}

// Check CHANGELOG
if (!fs.existsSync('CHANGELOG.md')) {
  warning('CHANGELOG.md does not exist');
} else {
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
  if (!changelog.includes(packageJson.version)) {
    warning(`Current version ${packageJson.version} not found in CHANGELOG.md`);
  } else {
    success(`Current version ${packageJson.version} documented in CHANGELOG.md`);
  }
}

// Check for common issues
console.log('\n🔍 Checking for common issues...');

// Check for dev dependencies in dependencies
const devDeps = Object.keys(packageJson.devDependencies || {});
const deps = Object.keys(packageJson.dependencies || {});
const overlap = deps.filter(dep => devDeps.includes(dep));
if (overlap.length > 0) {
  warning(`Dependencies also listed in devDependencies: ${overlap.join(', ')}`);
}

// Check peer dependencies
if (!packageJson.peerDependencies || Object.keys(packageJson.peerDependencies).length === 0) {
  warning('No peer dependencies specified. Consider if React should be a peer dependency.');
} else {
  success(`Peer dependencies configured: ${Object.keys(packageJson.peerDependencies).join(', ')}`);
}

// Check repository field
if (!packageJson.repository) {
  warning('No repository field specified');
} else {
  success('Repository field configured');
}

// Check keywords
if (!packageJson.keywords || packageJson.keywords.length === 0) {
  warning('No keywords specified for better discoverability');
} else {
  success(`Keywords configured: ${packageJson.keywords.length} keywords`);
}

// Summary
console.log('\n📊 Validation Summary:');
if (hasErrors) {
  console.log(`❌ Found ${hasErrors ? 'errors' : 'no errors'} that must be fixed before publishing`);
  process.exit(1);
} else if (hasWarnings) {
  console.log(`⚠️  Found warnings that should be addressed`);
  console.log('✅ No blocking errors found - package is ready for publishing');
} else {
  console.log('✅ All checks passed - package is ready for publishing');
}

console.log('\n🚀 To publish: npm run release:patch|minor|major');