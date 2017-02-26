/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {

    /**
     * DetailedViewController constructor function. Responsible for view logic of detailed-view.html
     * @param $scope
     * @param $uibModalInstance
     * @param FavoriteService
     * @param RecentViewed
     * @param movieDetail
     * @constructor
     */
    function DetailedViewController($scope, $uibModalInstance, FavoriteService, RecentViewed, movieDetail) {

        /**
         * on initialize function will add movie to recently viewed list when clicked to view details.
         */
        function onInit() {
            RecentViewed.addToRecentlyViewedMovies(movieDetail)
        }

        $scope.movieDetail = movieDetail;
        if (FavoriteService.isFavoriteMovie(movieDetail.imdbID)) {
            $scope.isFavorite = true;
        }

        /**
         * Will close the angular model popup
         */
        $scope.close = function () {
            $uibModalInstance.close(true);
        };

        /**
         * Will add movie to favorite list.
         */
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