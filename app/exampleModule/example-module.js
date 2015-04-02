var example = angular.module('example', ['ui.router']);

example.config(function ($stateProvider) {
	$stateProvider.state('app.example', {
		url: '/example',
		views: {
			'exampleModuleView': {
				templateUrl: 'exampleModule/example-view.html',
				controller: 'ExampleController'
			}
		}
	})
});