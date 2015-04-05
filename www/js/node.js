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

			top.href = $('#news .topline').find('a').attr('href');
			top.title = $('#news .topline').find('a').attr('title');
			top.date = $('#news .topline').find('i').text();

			//console.log(top.href + '-' + top.title + '-' + top.date);
			res.json(top);

		});
});

app.get('/newslist', function (req, res) {
	var url = 'http://www.neusoft.edu.cn/';

	superagent.get(url)
		.end(function (err, data) {
			if (err) console.log(err);

			var news = [];
			var $ = cheerio.load(data.text);

			$('#news li').each(function (index) {
				var $a = $(this).find('a');
				var $i = $(this).find('i');

				news.push({
					href: encodeURIComponent($a.attr('href')),
					title: $a.attr('title'),
					date: $i.text()
				});
				//console.log(news[index].href);
			});

			res.json(news);
		});
});

app.get('/news', function (req, res) {
	console.log('3')
	var url = req.query.url;
	console.log(url);
	console.log(url.toString());
	console.log(typeof url);

	superagent.get(url)
		.end(function (err, data) {
			if (err) console.log(err);

			var news = [];
			var $ = cheerio.load(data.text);

			$('.article-content').each(function () {

				news.push({
					title: $(this).find('h2').text(),
					date: $(this).find('.entry-date').text(),
					author: $(this).find('.author').text(),
					editor: $(this).find('.editor').text(),
					data: $(this).find('.data').text()
				});
			});
			console.log(news.title);
			res.json(news);
		});
});

app.listen(3000, 'localhost', function () {
	console.log('server started on the port : ' + 3000);
});

