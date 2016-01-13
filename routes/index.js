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
    var client = new oxford.Client('');

    client.emotion.analyzeEmotion({
        path: req.file.path,
    }).then(function (response) {
        console.log(response);

        var happyscore = 0

        var draw = gm(req.file.path);
        response.forEach(function (element) {
            var x = element.faceRectangle.left;
            var y = element.faceRectangle.top;
            var x1 = element.faceRectangle.left + element.faceRectangle.width;
            var y1 = element.faceRectangle.top + element.faceRectangle.height;

            draw.stroke("red", 2)
                .fill("#ffffffff")  //transparent box
                .drawRectangle(x, y, x1, y1)

            var happiness = element.scores.happiness
            var sadness = element.scores.sadness

            if (happiness > sadness)
                happyscore = happyscore + 1
            else
                happyscore = happyscore - 1
        }, this);

        var tempfile = 'uploads/file' + random(0,3000) + '.jpg';
        draw.write(tempfile, function (err) {
            if (err) console.log(err);
            var modifiedimage = base64_encode(tempfile);

            // would be better to never store file.  
            // would need to update projectoxford to work with in memory files.
            fs.unlink(req.file.path, function(err) {
                if (err) throw err;
                console.log('successfully deleted tmp file');
            });

            fs.unlink(tempfile, function(err)  {
                if (err) throw err;
                console.log('successfully deleted /tmp/hello');
            });

            res.render('result', { modified: modifiedimage, isHappy: happyscore });
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

function random (low, high) {
    return Math.random() * (high - low) + low;
}

module.exports = router;
