/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {
    function DetailedViewController($scope, movieDetail, $uibModalInstance) {
        $scope.movieDetail = movieDetail;
        $scope.close = function () {
            $uibModalInstance.close(true);
        };
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$scope',
            'movieDetail',
            '$uibModalInstance',
            DetailedViewController
        ];
    app.controller('DetailedViewController', requires);
}());