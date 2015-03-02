app.config(function ($stateProvider) {
	$stateProvider.state('module1', {
		url: '/module1',
		templateUrl: 'module1/module1-view.html',
		controller: 'Module1Controller'
	})
});