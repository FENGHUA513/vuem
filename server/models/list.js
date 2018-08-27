
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 定义一个Schema
var listSchema = new Schema({
	"code": Number,
	"data": {
		"a": Number
	}
})

// 输出(导出)
module.exports = mongoose.model('list',listSchema);













