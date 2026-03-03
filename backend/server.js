const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log('API KEY:', process.env.COHERE_API_KEY);
const ideasRouter = require('./routes/ideas');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/ideas', ideasRouter);

app.get('/', (req, res) => {
  res.send('Project Idea Generator API is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});