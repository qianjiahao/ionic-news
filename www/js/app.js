// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})

	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: 'AppCtrl'
			})

			.state('app.introduction', {
				url: "/introduction",
				views: {
					'menuContent': {
						templateUrl: "templates/introduction.html"
					}
				}
			})
			.state('app.cover', {
				url: "/cover",
				views: {
					'menuContent': {
						templateUrl: "templates/cover.html",
						controller:'CoverCtrl'
					}
				}
			})

			.state('app.images', {
				url: "/images",
				views: {
					'menuContent': {
						templateUrl: "templates/images.html"
					}
				}
			})
			.state('app.newslist', {
				url: "/newslist",
				views: {
					'menuContent': {
						templateUrl: "templates/newslist.html",
						controller: 'NewsListCtrl'
					}
				}
			})

			.state('app.news', {
				url: "/newslist/news?url",
				views: {
					'menuContent': {
						templateUrl: "templates/news.html",
						controller: 'SingleNewsCtrl'
					}
				}
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/cover');
	});
