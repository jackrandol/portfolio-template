const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const cors = require('cors');

//Gridfs
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const app = express();

app.use(fileUpload());

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
app.use('/api/photos', require('./routes/api/photos'));
app.use('/api/projects', require('./routes/api/projects'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
