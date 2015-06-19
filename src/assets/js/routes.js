app.config([
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller : 'HomeController',
            })
            .when('/hero/:name', {
                templateUrl: 'views/hero.html',
                controller : 'HeroController',
            })
            .when('/guide/:namePath', {
                templateUrl: 'views/guide.html',
                controller : 'GuideController',
            })
            .otherwise({
                redirectTo : '/'
            });

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
    }
]);
