var express = require('express');
var router = express.Router(); // 拿到express框架的路由
var mongoose = require('mongoose');
var List = require('../models/list');


router.get('/list', function(req, res, next) {
	List.find(function(err, doc) {
		if (err) {
			res.json({
				status: 1001
			})
		} else {
			console.log('ffff')
			res.json(doc[0])
		}
	})

});




module.exports = router;

