/**
 * Created by sunil.jhamnani on 2/25/17.
 */

(function () {

    function RecentViewedController($scope, RecentViewed) {
        $scope.movies = RecentViewed.getRecentlyViewedMovies();
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            'RecentViewed',
            RecentViewedController
        ];
    app.controller('RecentViewedController', requires);
}());
