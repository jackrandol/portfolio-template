const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./utils/db');
const cors = require('cors');
const app = express();

app.use(fileUpload({ useTempFiles: true }));

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ limit: '4mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => res.send(`API running`));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/about', require('./routes/api/about'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
