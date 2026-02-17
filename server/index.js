const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const seed = require('./scripts/seed');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/resources', require('./routes/resources'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/stories', require('./routes/stories'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// Database sync and server start
sequelize.sync().then(async () => {
  // Check if seeding is needed (simple check: if no resources exist)
  try {
    const Resource = require('./models/Resource');
    const count = await Resource.count();
    if (count === 0) {
      console.log('Seeding database...');
      await seed();
    }
  } catch (error) {
    console.error("Error during seeding check:", error);
  }

  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;
