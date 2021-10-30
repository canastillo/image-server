const express = require('express');
const path = require('path');
const multer = require('multer');
const less = require('less-middleware');

const helpers = require('./helpers');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

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
        res.send(`You have uploaded this image: <hr/><img src="./uploads/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
    });



// app.use(less(path.join(__dirname,'source','less'),{
//     dest: path.join(__dirname, 'public'),
//     options: {
//         compiler: {
//             compress: false,
//         },
//     },
//     preprocess: {
//         path: function(pathname, req) {
//             return pathname.replace('/css/','/'); 
//         },
//     },
//     force: true,
// }));

app.listen(port, () => console.log(`Listening on port ${port}`));
