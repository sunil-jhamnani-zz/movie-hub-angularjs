/**
 * Created by sunil.jhamnani on 2/25/17.
 */

(function () {

    function RecentViewedController($scope, RecentViewed) {
        $scope.movies = RecentViewed.getRecentlyViewedMovies().sort(function (obj1, obj2) {
            return obj1.Year- obj2.Year
        });
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            'RecentViewed',
            RecentViewedController
        ];
    app.controller('RecentViewedController', requires);
}());
