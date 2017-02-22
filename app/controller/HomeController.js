/**
 * Created by sunil.jhamnani on 2/23/17.
 */
(function () {
    'use strict';

    function HomeController($scope, $rootScope, $filter, $http, Configuration) {
        $scope.getDetails = function () {
            if($scope.movie.name) {
                $http({
                    method: 'GET',
                    url: $filter('fmt')(BY_TITLE_URL, {name: $scope.movie.name, year: $scope.movie.year})
                }).then(function (response) {
                    if (response.data.Response) {

                    }
                })
            }
        }
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            '$rootScope',
            '$filter',
            '$http',
            'Configuration',
            HomeController
        ];
    app.controller('HomeController', requires);
}());