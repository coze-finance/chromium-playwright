import { chromium, BrowserServer } from 'playwright-core';

async function startBrowserServer(): Promise<void> {
  let browserServer: BrowserServer | null = null;

  try {
    // Launch the browser server
    browserServer = await chromium.launchServer({
      headless: true,
      args: [
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      port: 9222,
    });

    const wsEndpoint = browserServer.wsEndpoint();
    console.log(`Browser WebSocket endpoint: ${wsEndpoint}`);

    // Handle shutdown gracefully
    const shutdown = async () => {
      console.log('Shutting down browser server...');
      if (browserServer) {
        await browserServer.close();
      }
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Failed to start browser server:', error);
    if (browserServer) {
      await browserServer.close();
    }
    process.exit(1);
  }
}

startBrowserServer();
