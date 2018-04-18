import Mock from 'mockjs';
var baseUrl = 'https://ssl.yunhou.com/supplier';

var parseUrl = function (str, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = str.match(reg);
	var context = "";
	if (r != null){
		context = r[2];
	}
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? "" : context;
}

//login -------------------------
Mock.mock(baseUrl + '/selectapi/brand_select', function(opt) {
    var key = parseUrl(opt.body, 'key');
    return {
      error: '1',
      msg: '登录失败',
      data: [{
        "brand_id": "1481",
        "brand_name": "东文",
        "textId": "1481",
        "text": key+"东文",
        "etl_date": "2017-05-22 17:21:05",
        "id": "149",
        "retek_last_update": "2016-08-29 15:24:17"
      },
      {
        "brand_id": "2595",
        "brand_name": "宏都",
        "textId": "2595",
        "text": key+"宏都",
        "etl_date": "2017-05-22 17:21:29",
        "id": "3005",
        "retek_last_update": "2016-08-29 15:24:17"
      }
      ]
    }
});
