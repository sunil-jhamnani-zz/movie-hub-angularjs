/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {
    function DetailedViewController($scope, $uibModalInstance, FavoriteService, RecentViewed, movieDetail) {

        function onInit() {
            RecentViewed.addToRecentlyViewedMovies(movieDetail)
        }

        $scope.movieDetail = movieDetail;
        if (FavoriteService.isFavoriteMovie(movieDetail.imdbID)) {
            $scope.isFavorite = true;
        }
        $scope.close = function () {
            $uibModalInstance.close(true);
        };
        $scope.addToFavorite = function () {
            FavoriteService.addFavoriteMovies(movieDetail);
            $scope.isFavorite = true;
        };

        onInit();


    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            '$uibModalInstance',
            'FavoriteService',
            'RecentViewed',
            'movieDetail',
            DetailedViewController
        ];
    app.controller('DetailedViewController', requires);
}());