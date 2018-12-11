var express = require('express');
var router = express.Router();
var sql = require('../mysql/sql.js');
var query = require('../mysql/query.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api/get/list', function(req, res, next) {
    var type = req.query.type; //类型
    var page = req.query.page; //第几页数据
    var page_size = req.query.page_size; //每页显示多少数据
    var start = (page - 1) * page_size;
    var sqlstr = `select * from stars where type=${type} limit ${start},${page_size}`;
    var sqlcount = `select count(*) from stars where type=${type}`;
    query(sqlcount, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err });
        } else {
            var total = Math.ceil(result[0]['count(*)'] / page_size); //总页数
            renderlist(total);
        }
    });

    function renderlist(total) {
        query(sqlstr, function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, msg: '查找成功', data: result, total: total });
            }
        })
    }
});
module.exports = router;