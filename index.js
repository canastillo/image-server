// ACTION: Import the Express library into our project. Path library provides a utility for working with file and 
// directory paths. The less-middlewear library allows us to process "less" files as required by the Express.JS 
// framework.
var express = require('express');
var path = require('path');
var less = require('less-middleware');

// SERVER VERSION #1 ---------- ----------

// ACTION: Create an instance of our Express server named myApp.
var myApp = express();
    
myApp.get('/', function(requestA, responseB) {
	responseB.send('Success');
})

// SERVER VERSION #2 ---------- ----------

	

// ACTION: Use this template available online from: 
// https://blackbricksoftware.com/bit-on-bytes/77-basic-node-js-web-server-setup
myApp.use(less(path.join(__dirname,'source','less'),{
    dest: path.join(__dirname, 'public'),
    options: {
        compiler: {
            compress: false,
        },
    },
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace('/css/','/'); 
        },
    },
    force: true,
}));

// ACTION: Define static server.
myApp.use(express.static(path.join(__dirname, 'public')));


// BEGIN LISTENING MODE ---------- ----------

// ACTION: Force server into listening mode, making it available to respond to client requests. Note that the 
// server will listen for requests at port 1234.
var server = myApp.listen(1234);

// NOTE: You can call this server using http://localhost:1234/cat_picture.jpeg
