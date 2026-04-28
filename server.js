const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');    
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Можно загружать только изображения!'), false);
    }
};

const upload = multer({ storage, fileFilter });


app.set('view engine', 'ejs');      
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Ошибка чтения папки uploads:', err);
            return res.render('index', { images: [] });
        }

        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        res.render('index', { images });
    });
});

app.post('/upload', upload.single('screenshot'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Ошибка: файл не загружен или не является изображением.');
    }
    res.redirect('/');
});

app.use((req, res, next) => {
    res.status(404).render('error');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});