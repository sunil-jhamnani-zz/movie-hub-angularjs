/**
 * Created by sunil.jhamnani on 2/23/17.
 */
(function () {
    'use strict';

    function HomeController($scope, $rootScope, $filter, $http, Configuration, OmdbHttpFactory) {
        $scope.results = OmdbHttpFactory.results;
        $scope.movie = {
            name: "",
            year:"",
            page:1
        };
        $scope.getDetails = function () {
            if($scope.movie.name) {
                $scope.movie.page = 1
                prepareList();
            }
        };

        $scope.pageChanged = function () {
            $scope.movie.page = $scope.currentPage;
            prepareList();
        };

        $scope.reset = function () {
            $scope.movies = $scope.results = $scope.movie = null
        }

        function prepareList() {
            OmdbHttpFactory.getSearchedMovieList($scope.movie).then(function (movies) {
                $scope.movies = movies
            });
        }
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            '$rootScope',
            '$filter',
            '$http',
            'Configuration',
            'ngOMDBSearchCore.factories.OmdbHttpFactory',
            HomeController
        ];
    app.controller('HomeController', requires);
}());