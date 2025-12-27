const express = require('express');
const app = express ();
const morgan = require('morgan');
const dotenv = require("dotenv");
const connectDb = require('./config/db');
const userRoutes = require('./routes/user.routes');
dotenv.config();

const port = process.env.PORT || 3000



app.use(express.json());
app.use(morgan('dev')); 

app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    connectDb();
    console.log(`App listening at http://localhost:${port}`);
});