/**
 * Created by sunil.jhamnani on 2/22/17.
 */
/*
 global module
 */
(function () {
    'use strict';
    /**
     * ngOMDBSearch: Plays the role of main mdoule or
     * actual app module. This module will be provided to
     * npApp directive.
     */
    angular.module('ngOMDBSearch', [
        //3rd party modules
        'ngRoute',
        'sprintf'

        //our modules
    ]);
}());

(function () {
    'use strict';

    /**
     * Config function for ngOMDBSearch. We'll configure route and base
     * url for rest api's here.
     * @param $routeProvider
     * @param Configuration
     */
    function config($routeProvider, Configuration) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/home', {
                templateUrl: "views/home.html",
                controller: "HomeController"
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    var app = angular.module('ngOMDBSearch'),
        requires = [
            '$routeProvider',
            'Configuration',
            config
        ];
    app.config(requires);

}());