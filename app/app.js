var app = angular.module('app', [
	'ionic',
	'ui.router',
	'home',
	'example'
]);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app', {
		abstract: true,
		templateUrl: 'menu/menu-view.html'
	});

	$urlRouterProvider.otherwise('/home');
});
