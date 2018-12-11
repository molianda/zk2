define(function() {
    var $ = {
        ajax: function(opt) {
            var json = opt || {};
            var url = json.url;
            if (!url) {
                return;
            }
            var type = json.type || 'get';
            var dataType = json.dataType || 'text';
            var data = json.data || {};
            var async = json.async === false ? json.async : true;
            var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            data = formatdata(data);
            xml.onreadystatechange = function() {
                if (xml.readyState === 4) {
                    if (xml.status === 200) {
                        if (dataType === 'json') {
                            json.success && json.success(JSON.parse(xml.responseText));
                        } else {
                            json.success && json.success(xml.responseText);
                        }
                    } else {
                        json.error && json.error('请求异常，状态码：' + xml.status);
                    }
                }
            }
            switch (type.toUpperCase()) {
                case 'GET':
                    url = data ? url + '?' + data : url;
                    xml.open(type, url, async);
                    xml.send();
                    break;
                case 'POST':
                    xml.open(type, url, async);
                    xml.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                    xml.send(data);
                    break;
            }
        }
    }

    function formatdata(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(i + '=' + obj[i]);
        }
        return arr.join('&');
    }
    return $;
})