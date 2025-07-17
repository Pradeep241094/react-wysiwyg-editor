// Simple test to verify library can be imported and used
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if build files exist
const distPath = path.join(__dirname, 'dist');
const requiredFiles = [
  'wysiwyg-editor.es.js',
  'wysiwyg-editor.cjs.js',
  'wysiwyg-editor.css',
  'types/lib/index.d.ts'
];

console.log('🔍 Checking library build files...');

let allFilesExist = true;
for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    allFilesExist = false;
  }
}

if (allFilesExist) {
  console.log('\n🎉 All required library files are present!');
  
  // Check package.json exports
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('\n📦 Package.json exports:');
  console.log(`- Name: ${packageJson.name}`);
  console.log(`- Version: ${packageJson.version}`);
  console.log(`- Main: ${packageJson.main}`);
  console.log(`- Module: ${packageJson.module}`);
  console.log(`- Types: ${packageJson.types}`);
  
  console.log('\n✨ Library is ready for publishing!');
} else {
  console.log('\n❌ Some required files are missing. Please run "npm run build" first.');
  process.exit(1);
}