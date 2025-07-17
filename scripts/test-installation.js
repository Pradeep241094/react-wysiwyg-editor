#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing library installation and usage...\n');

const testDir = path.join(__dirname, '..', 'test-installation');

// Clean up any existing test directory
if (fs.existsSync(testDir)) {
  console.log('🧹 Cleaning up existing test directory...');
  fs.rmSync(testDir, { recursive: true, force: true });
}

try {
  // Create test directory
  console.log('📁 Creating test project directory...');
  fs.mkdirSync(testDir, { recursive: true });
  
  // Create a minimal package.json for the test project
  console.log('📦 Creating test package.json...');
  const testPackageJson = {
    name: 'test-wysiwyg-installation',
    version: '1.0.0',
    private: true,
    type: 'module',
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/react': '^18.2.37',
      '@types/react-dom': '^18.2.15',
      'typescript': '^5.2.2',
      'vite': '^5.4.19',
      '@vitejs/plugin-react': '^4.6.0'
    }
  };
  
  fs.writeFileSync(
    path.join(testDir, 'package.json'),
    JSON.stringify(testPackageJson, null, 2)
  );
  
  // Create a test React component that uses the library
  console.log('⚛️  Creating test React component...');
  const testComponent = `import React from 'react';
import { WYSIWYGEditor } from '@prmargas/react-wysiwyg-editor';
import '@prmargas/react-wysiwyg-editor/styles';

function App() {
  const [content, setContent] = React.useState('');
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>WYSIWYG Editor Test</h1>
      <WYSIWYGEditor
        initialContent="<p>Hello World!</p>"
        placeholder="Start typing..."
        onChange={setContent}
      />
      <div style={{ marginTop: '20px' }}>
        <h2>Output:</h2>
        <pre>{content}</pre>
      </div>
    </div>
  );
}

export default App;`;
  
  fs.writeFileSync(path.join(testDir, 'App.tsx'), testComponent);
  
  // Create index.html
  console.log('🌐 Creating test HTML file...');
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WYSIWYG Editor Test</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>`;
  
  fs.writeFileSync(path.join(testDir, 'index.html'), indexHtml);
  
  // Create main.tsx
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`;
  
  fs.writeFileSync(path.join(testDir, 'main.tsx'), mainTsx);
  
  // Create vite config
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`;
  
  fs.writeFileSync(path.join(testDir, 'vite.config.ts'), viteConfig);
  
  // Create tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ['*.tsx', '*.ts'],
    references: [{ path: './tsconfig.node.json' }]
  };
  
  fs.writeFileSync(
    path.join(testDir, 'tsconfig.json'),
    JSON.stringify(tsConfig, null, 2)
  );
  
  // Create tsconfig.node.json
  const tsConfigNode = {
    compilerOptions: {
      composite: true,
      skipLibCheck: true,
      module: 'ESNext',
      moduleResolution: 'bundler',
      allowSyntheticDefaultImports: true
    },
    include: ['vite.config.ts']
  };
  
  fs.writeFileSync(
    path.join(testDir, 'tsconfig.node.json'),
    JSON.stringify(tsConfigNode, null, 2)
  );
  
  // Pack the current library
  console.log('📦 Packing current library...');
  const packResult = execSync('npm pack', { 
    cwd: path.join(__dirname, '..'),
    encoding: 'utf8' 
  });
  
  const tarballName = packResult.trim();
  const tarballPath = path.join(__dirname, '..', tarballName);
  
  // Install dependencies in test directory
  console.log('📥 Installing test dependencies...');
  execSync('npm install', { 
    cwd: testDir,
    stdio: 'inherit'
  });
  
  // Install the packed library
  console.log('📥 Installing packed library...');
  execSync(`npm install "${tarballPath}"`, { 
    cwd: testDir,
    stdio: 'inherit'
  });
  
  // Try to build the test project
  console.log('🔨 Building test project...');
  execSync('npx vite build', { 
    cwd: testDir,
    stdio: 'inherit'
  });
  
  console.log('✅ Installation test completed successfully!');
  console.log('📁 Test project created at:', testDir);
  console.log('🧹 To clean up: rm -rf', testDir);
  
  // Clean up the tarball
  fs.unlinkSync(tarballPath);
  
} catch (error) {
  console.error('❌ Installation test failed:', error.message);
  
  // Clean up on failure
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  
  process.exit(1);
}