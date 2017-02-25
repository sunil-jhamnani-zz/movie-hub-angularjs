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
        'sprintf',
        'ui.bootstrap',
        'ngStorage',
        'toaster',

        //our modules
        'ngOMDBSearchCore'
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
    function config($routeProvider, Configuration, OmdbHttpFactoryProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/home', {
                templateUrl: "views/home.html",
                controller: "HomeController"
            })
            .when('/favorite', {
                templateUrl:"views/favorite.html",
                controller:"FavoriteController"
            })
            .when('/recent', {
                templateUrl:"views/recently-viewed.html",
                controller:"RecentViewedController"
            })
            .otherwise({
                redirectTo: '/'
            });

        OmdbHttpFactoryProvider.config({
            baseUrl: Configuration.API_URL,
            maxFavoriteLength: Configuration.MAX_FAVORITE_LENGTH
        })
    }
    var app = angular.module('ngOMDBSearch'),
        requires = [
            '$routeProvider',
            'Configuration',
            'ngOMDBSearchCore.factories.OmdbHttpFactoryProvider',
            config
        ];
    app.config(requires);

}());