var express = require('express');
var router = express.Router();

var multer = require('multer');
//var storage = multer.memoryStorage()
var upload = multer({ dest: 'uploads/' });
var oxford = require('project-oxford');
var fs = require('fs')
    , gm = require('gm');




/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/result', function (req, res, next) {
    res.render('result', { title: 'Express' });
});

router.post('/upload', upload.single('thumbnail'), function (req, res, next) {
    var client = new oxford.Client('b38409352b284f459b5e60a3e9eb4fcd');

    client.emotion.analyzeEmotion({
        path: req.file.path,
    }).then(function (response) {
        console.log(response);


        var draw = gm(req.file.path);
        response.forEach(function (element) {
            var x = element.faceRectangle.left;
            var y = element.faceRectangle.top;
            var x1 = element.faceRectangle.left + element.faceRectangle.width;
            var y1 = element.faceRectangle.top + element.faceRectangle.height;

            draw.stroke("red", 2)
                .fill("#ffffffff")  //transparent box
                .drawRectangle(x, y, x1, y1)
        }, this);

        draw.write('uploads/' + 'modified' + '.jpg', function (err) {
            if (err) console.log(err);
            var modifiedimage = base64_encode('uploads/' + 'modified' + '.jpg');

            res.render('result', { modified: modifiedimage });
        });

    });
});  

//http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html
// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;
