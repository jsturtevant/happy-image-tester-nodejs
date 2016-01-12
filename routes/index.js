var express = require('express');
var router = express.Router();
var oxford = require('project-oxford');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/result', function(req, res, next) {
  res.render('result', { title: 'Express' });
});

router.post('/upload', function(req, res, next) {
    var client = new oxford.Client('b38409352b284f459b5e60a3e9eb4fcd');
    
    client.emotion.analyzeEmotion({
        url: 'http://www.jamessturtevant.com/assets/profile-low-res.jpg',
    }).then(function (response) {
        console.log(response);
        
        res.render('result', { title: 'Express' });
    });  
    
  
});

module.exports = router;
