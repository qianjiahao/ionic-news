angular.module('starter.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
		// Form data for the login modal
		$scope.loginData = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function (modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function () {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function () {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function () {
			console.log('Doing login', $scope.loginData);

			// Simulate a login delay. Remove this and replace with your login
			// code if using a login system
			$timeout(function () {
				$scope.closeLogin();
			}, 1000);
		};
	})
	.controller('CoverCtrl',function($scope,$http){

		$http.get('http://localhost:3000/topline')
			.success(function(data){
				$scope.top = data;
				//console.log('controller:'+data);
			})
			.error(function(err){
				console.log(err);
			})
	})
	.controller('NewsListCtrl', function ($scope,$http) {

		$http.get('http://localhost:3000/newslist')
			.success(function(data){
				$scope.news = data;
				//console.log('news:'+data);
			})
			.error(function(err){
				console.log(err);
			})

	})

	.controller('SingleNewsCtrl', function ($scope,$stateParams,$http) {

		$http.get('http://localhost:3000/news?url=' + $stateParams.url)
			.success(function(data){
				console.log(data.data);
				$scope.article = data;
			})
			.error(function(err){
				console.log(err);
			});
	})
;
