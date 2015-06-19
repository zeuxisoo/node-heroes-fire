var app = angular.module('fires', ['ngRoute']);

app.constant('app', {
    version: Date.now(),
    apiUrl : 'http://www.heroesfire.com'
})

app.run(['app', 'dataService', function(app, dataService) {
    app.dataService = dataService;
}]);
