#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the new version from package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const newVersion = packageJson.version;

// Get current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

// Read current changelog
const changelogPath = 'CHANGELOG.md';
let changelog = '';

if (fs.existsSync(changelogPath)) {
  changelog = fs.readFileSync(changelogPath, 'utf8');
}

// Check if this version already exists in changelog
if (changelog.includes(`## [${newVersion}]`)) {
  console.log(`Version ${newVersion} already exists in changelog. Skipping update.`);
  process.exit(0);
}

// Find the position to insert the new version
const lines = changelog.split('\n');
let insertIndex = -1;

// Look for the first version entry after the header
for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/^## \[\d+\.\d+\.\d+\]/)) {
    insertIndex = i;
    break;
  }
}

// If no version entries found, insert after the header section
if (insertIndex === -1) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('## [') || lines[i].includes('### ')) {
      insertIndex = i;
      break;
    }
  }
}

// Create new version entry
const newEntry = [
  `## [${newVersion}] - ${currentDate}`,
  '',
  '### Added',
  '- New features and enhancements',
  '',
  '### Changed',
  '- Updates and improvements',
  '',
  '### Fixed',
  '- Bug fixes and corrections',
  '',
  '### Removed',
  '- Deprecated features removed',
  ''
];

// Insert the new entry
if (insertIndex !== -1) {
  lines.splice(insertIndex, 0, ...newEntry);
} else {
  // If no good insertion point found, append to end
  lines.push('', ...newEntry);
}

// Write updated changelog
fs.writeFileSync(changelogPath, lines.join('\n'));

console.log(`✅ Updated CHANGELOG.md with version ${newVersion}`);
console.log('📝 Please edit the changelog to add specific changes before committing.');