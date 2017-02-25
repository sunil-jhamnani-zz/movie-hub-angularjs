/**
 * Created by sunil.jhamnani on 2/23/17.
 */
(function () {
    'use strict';

    function HomeController($scope, OmdbHttpFactory, toaster) {

        function onLoad() {
            OmdbHttpFactory.getSearchedMovieList().then(function (movies) {
                $scope.movies = movies;
                $scope.movie = OmdbHttpFactory.results.searchFilters;
                $scope.totalPages = OmdbHttpFactory.results.total;
            }, function (error) {
                toaster.pop('error', error.Error + " Error while calling api");
            });
        }

        $scope.reset = function () {
            $scope.movies = $scope.movie = $scope.totalPages = null;
            OmdbHttpFactory.clearFilters()
        };

        $scope.prepareList = function () {
            OmdbHttpFactory.getSearchedMovieList($scope.movie).then(function (movies) {
                $scope.movies = movies
            },
            function (error) {
                toaster.pop('error', error.Error + " Error while calling api");
            });
            $scope.totalPages = OmdbHttpFactory.results.total;
        };

        onLoad();
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            'ngOMDBSearchCore.factories.OmdbHttpFactory',
            'toaster',
            HomeController
        ];
    app.controller('HomeController', requires);
}());