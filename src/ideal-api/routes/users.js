/*
 * @Author: 田佳茹 
 * @Date: 2018-12-10 09:25:31 
 * @Last Modified by: 田佳茹
 * @Last Modified time: 2018-12-10 10:17:39
 */

var express = require('express');
var router = express.Router();
var sql = require('../mysql/sql.js');
var query = require('../mysql/query.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var pagenum = req.body.pagenum;
    var page = req.body.page;
    var page_size = req.body.page_size;
    var type = req.body.type;
    query(sql.SELECT_COUNT, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err });
        } else {
            pagenum = (pagenum - 1) * page_size;
            var total = Math.ceil(result[0]['count(*)'] / page_size); //总页数
            renderlist(total);
        }
    });

    function renderlist(total) {
        query(sql.SELECT_LIMIT, [page, page_size], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, msg: '查找成功', data, result, total: total });
            }
        })
    }
});

module.exports = router;