// Router
const router = require('express').Router();
const apiRoutes = require('./api');

// API routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// Export
module.exports = router;