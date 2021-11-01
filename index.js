const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const helpers = require('./helpers');
const PORT = process.env.PORT || 5000;
const PUBLIC_PATH = path.join(__dirname, 'public')

const app = express();

app.use(express.static(PUBLIC_PATH));

app.set('views', './views');
app.set('view engine', 'pug');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },

    filename: function (req, file, cb) {
        const fileNames = fs.readdirSync(`${PUBLIC_PATH}/uploads`);
        let fn = file.originalname
        let counter = 1

        while (fileNames.includes(fn)) {
            console.log("Vuelta ", counter);
            fn = `${file.originalname}(${counter++})${path.extname(file.originalname)}`
        }

        // cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, fn);
    }
});

var upload = multer({ storage: storage, fileFilter: helpers.imageFilter })

app.post('/upload-single', upload.single('single-img'), (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    fileName = req.file.filename
    res.render('success', { fileName });
});

app.get('/gallery', (req, res) => {
    const imgs = fs.readdirSync(`${PUBLIC_PATH}/uploads`);
    res.render('gallery.pug', { imgs });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
