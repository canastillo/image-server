const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const helpers = require('./helpers');
const PORT = process.env.PORT || 5000;
const PUBLIC_PATH = path.join(__dirname, 'public')

const app = express();

app.use(express.static(PUBLIC_PATH));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage, fileFilter: helpers.imageFilter })

app.post('/upload-single', upload.single('profile_pic'), (req, res) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        res.send(`You have uploaded this image: <hr/><img src="./uploads/${req.file.filename}" width="500"><hr /><a href="./uploads/${req.file.filename}">View image</a><a href="./">Upload another image</a>`);
    });



app.get('/gallery', (req, res) => {
    const imgs = fs.readdirSync(`${PUBLIC_PATH}/uploads`);
    res.render('gallery.pug', { imgs });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
