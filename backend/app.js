const express = require('express');
const db = require('./server');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const authRoute =require('./routes/auth');
const uploadRoute =require('./routes/upload');
const dataRoute =require('./routes/data');
const pageRoute =require('./routes/pages');
const homeRoute =require('./routes/home');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: [ 'http://localhost:3000', 'http://localhost:3001' ],
    method: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true,
}))
// app.use(cors())

app.use(express.static('bucket'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/upload', uploadRoute);
app.use('/data', dataRoute);
app.use('/pages', pageRoute);

// app.get('/', (req, res) => {
//     res.send('tada');
// })

app.listen(process.env.PORT, ()=> {
    console.log(`app listening on port ${process.env.PORT}`)
});