const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');      
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.use((req, res, next) => {
    res.status(404).render('error');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});