var express = require('express');
var router = express.Router();

var multer = require('multer');
//var storage = multer.memoryStorage()
var upload = multer({ dest: 'uploads/' });
var oxford = require('project-oxford');
var fs = require('fs')
  , gm = require('gm');




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/result', function(req, res, next) {
    res.render('result', { title: 'Express' });
});

router.post('/upload', upload.single('thumbnail'), function(req, res, next) {
    var client = new oxford.Client('b38409352b284f459b5e60a3e9eb4fcd');

    client.emotion.analyzeEmotion({
        path: req.file.path,
    }).then(function (response) {
        console.log(response);
      
        gm(req.file.path)
            .stroke("red", 7)
            .fill("#ffffffbb")
            .drawRectangle(60, 10, 70, 20)
            .write('uploads/' + 'modified' + '.jpg', function (err) {
                if (err) console.log(err);
                
         
               var modifiedimage = base64_encode('uploads/' + 'modified' + '.jpg');
            
                res.render('result', { modified: modifiedimage });
            });
       
    });
});  


// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;
