/**
 * Created by qianjiahao on 15/4/3.
 */
var express = require('express'),
	superagent = require('superagent'),
	cheerio = require('cheerio'),
	app = new express();


app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.get('/topline', function (req, res) {
	var url = 'http://www.neusoft.edu.cn/';

	superagent.get(url)
		.end(function (err, data) {
			if (err) console.log(err);
			var top = {};
			var $ = cheerio.load(data.text);

			var $element = $($('#news .topline a.toptitle')[0]);
			var $time = $('#news .topline i');

			top.href = $element.attr('href');
			top.title = $element.text();
			top.time = $time.text();

			res.json(top);

		});
});

app.get('/news', function (req, res) {
	var url = 'http://www.neusoft.edu.cn/';

	superagent.get(url)
		.end(function (err, data) {
			if (err) console.log(err);

			var news = [];
			var $ = cheerio.load(data.text);

			$('#news li').each(function(){
				var $a = $(this).find('a');
				var $i = $(this).find('i');

				news.push({
					href:$a.attr('href'),
					title:$a.attr('title'),
					time:$i.text()
				})
			})
			console.log(news);
			res.json(news);
		});
});

app.listen(3000, 'localhost');

