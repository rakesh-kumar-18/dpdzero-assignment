const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const userController = require('./controllers/userController');
const dataController = require('./controllers/dataController');

app.use(express.json());
app.use('/api', userController);
app.use('/api', dataController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});