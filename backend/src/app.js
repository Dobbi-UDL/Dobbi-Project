const express = require('express');
const cors = require('cors');
const companyRoutes = require('./routes/companies');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', companyRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;


app.get('/', (req, res) => {
  res.send('Server is running NOW!');
});