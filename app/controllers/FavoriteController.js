/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {

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
