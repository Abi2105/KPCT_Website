const fs = require('fs');
const path = require('path');

const cors = require('cors');
const express = require('express');

const { corsOrigins, frontendDist, nodeEnv } = require('./config');
const contactRouter = require('./routes/contact');

const app = express();

function isSameOrigin(origin, host) {
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

app.use(
  cors((req, callback) => {
    const origin = req.headers.origin;

    // No Origin header: a non-browser client or a plain navigation.
    // Same-origin: the production build served by this very process - browsers
    // still send Origin on same-origin POSTs, so this must be allowed.
    if (!origin || isSameOrigin(origin, req.headers.host) || corsOrigins.includes(origin)) {
      return callback(null, { origin: true });
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  })
);
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: nodeEnv, timestamp: new Date().toISOString() });
});

app.use('/api/contact', contactRouter);

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// When a production build exists, the API also serves it so a single process
// serves both the app and the API. In development Vite serves the app instead.
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Client-side routes (/about, /contact, ...) must fall back to index.html.
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  console.warn(`No frontend build found at ${frontendDist}; serving API only.`);
}

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  const status = error.statusCode || (/CORS/.test(error.message) ? 403 : 500);
  return res.status(status).json({ success: false, message: error.message || 'Server error' });
});

module.exports = app;
