/*
 * @Author: 田佳茹 
 * @Date: 2018-12-10 09:10:01 
 * @Last Modified by: 田佳茹
 * @Last Modified time: 2018-12-10 09:16:08
 */

var mysql = require('mysql');
var opt = {
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'molianda',
    connectionLimit: 100
}
var pool = mysql.createPool(opt);
module.exports = function(sql, arr, fn) {
    fn = fn ? fn : arr;
    arr = arr || [];
    pool.getConnection(function(err, con) {
        if (err) {
            fn(err);
        } else {
            con.query(sql, arr, function(err, result) {
                if (err) {
                    fn(err);
                } else {
                    fn(null, result);
                }
                con.release();
            })
        }
    })
}