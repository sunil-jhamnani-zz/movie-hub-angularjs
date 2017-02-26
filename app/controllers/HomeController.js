/**
 * Created by sunil.jhamnani on 2/23/17.
 */
(function () {
    'use strict';

    /**
     * HomeController constructor function. Responsible for view logic of home.html
     * @param $scope
     * @param OmdbHttpFactory
     * @param toaster
     * @constructor
     */
    function HomeController($scope, OmdbHttpFactory, toaster) {

        /**
         * on load function to fetch movies based on last used search filters
         */
        function onLoad() {
            OmdbHttpFactory.getSearchedMovieList().then(function (movies) {
                $scope.movies = movies;
                $scope.movie = OmdbHttpFactory.results.searchFilters;
                $scope.totalPages = OmdbHttpFactory.results.total;
            }, function (error) {
                toaster.pop('error', "Something went wrong while calling api");
            });
        }

        /**
         * Reset all search filters and clean the list on home page
         */
        $scope.reset = function () {
            $scope.movies = $scope.movie = $scope.totalPages = null;
            OmdbHttpFactory.clearFilters()
        };

        /**
         * Use the search filters to prepare the list on home page
         */
        $scope.prepareList = function () {
            OmdbHttpFactory.getSearchedMovieList($scope.movie).then(function (movies) {
                $scope.movies = movies
            },
            function (error) {
                toaster.pop('error', "Error while calling api. Please check the search filters");
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