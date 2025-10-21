const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

const rootRoutes = require('./routes');
const notesRouter = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Enable CORS for common methods and headers
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.set('trust proxy', true);

// Swagger docs with dynamic server URL
app.use('/docs', swaggerUi.serve, (req, res, next) => {
  const host = req.get('host'); // may or may not include port
  let protocol = req.protocol;  // http or https

  const actualPort = req.socket.localPort;
  const hasPort = host.includes(':');

  const needsPort =
    !hasPort &&
    ((protocol === 'http' && actualPort !== 80) ||
    (protocol === 'https' && actualPort !== 443));
  const fullHost = needsPort ? `${host}:${actualPort}` : host;
  protocol = req.secure ? 'https' : protocol;

  const dynamicSpec = {
    ...swaggerSpec,
    servers: [
      {
        url: `${protocol}://${fullHost}`,
      },
    ],
  };
  swaggerUi.setup(dynamicSpec)(req, res, next);
});

// Parse JSON request body
app.use(express.json());

// Health route
app.use('/', rootRoutes);

// Notes routes
app.use('/notes', notesRouter);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
