/**
 * Created by sunil.jhamnani on 2/25/17.
 */

(function () {

    /**
     * RecentViewedController constructor function. Responsible for view logic of recently-viewed.html
     * @param $scope
     * @param RecentViewed
     * @constructor
     */
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
