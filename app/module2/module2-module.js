app.config(function ($stateProvider) {
	$stateProvider.state('module2', {
		url: '/module2',
		templateUrl: 'module2/module2-view.html',
		controller: 'Module2Controller'
	})
});