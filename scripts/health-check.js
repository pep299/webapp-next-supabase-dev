#!/usr/bin/env node

async function healthCheck() {
  const urls = [
    'http://localhost:3002',
    'http://localhost:3001'
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      console.log(`✅ ${url} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
}

healthCheck();