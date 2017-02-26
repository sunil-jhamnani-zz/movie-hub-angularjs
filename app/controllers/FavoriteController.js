/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {

    /**
     * FavoriteController constructor function. Responsible for view logic of favorite.html
     * @param $scope
     * @param FavoriteService
     * @constructor
     */
    function FavoriteController($scope, FavoriteService) {
        $scope.movies = FavoriteService.getFavoriteMovies();
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            'FavoriteService',
            FavoriteController
        ];
    app.controller('FavoriteController', requires);
}());
