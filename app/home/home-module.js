var home = angular.module('home', ['ui.router']);

home.config(function ($stateProvider) {
	$stateProvider.state('app.home', {
		url: '/home',
		views: {
			'homeView': {
				templateUrl: 'home/home-view.html',
				controller: 'HomeController'
			}
		}
	})
});