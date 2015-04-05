/**
 * Created by qianjiahao on 15/4/3.
 */
var express = require('express'),
	superagent = require('superagent'),
	cheerio = require('cheerio'),
	app = new express(),
	resource = [];


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
			var $element = $('#news .topline');
			top.href = encodeURIComponent($element.find('a').attr('href'));
			top.title = $element.find('a').attr('title');
			top.date = $element.find('i').text();

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
				if ($a.attr('href').match('neusoft')) {
					news.push({
						href: encodeURIComponent($a.attr('href')),
						title: $a.attr('title'),
						date: $i.text()
					});
				}
				//console.log(news[index].href);
			});

			res.json(news);
		});
});

app.get('/news', function (req, res) {
	//console.log('news')
	var url = req.query.url;

	if (resource[url] == undefined) {
		superagent.get(url)
			.end(function (err, data) {
				if (err) console.log(err);

				console.log('no err');

				var $ = cheerio.load(data.text);
				var $element = $('.article-content');

				var article = {
					title: $element.find('h2').text(),
					date: $element.find('.entry-date').text(),
					author: $element.find('.author').text(),
					editor: $element.find('.editor').text(),
					data: $element.find('.data').text().split('\n')
				};

				resource[url] = article;

				console.log('new article');
				res.json(article);
			});

	} else {
		console.log('dup article');
		res.json(resource[url]);
	}
});

app.listen(3000, 'localhost', function () {
	console.log('server started on the port : ' + 3000);
});

