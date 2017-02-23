/**
 * Created by sunil.jhamnani on 2/23/17.
 */
(function () {
    function MovieListController(OmdbHttpFactory, $uibModal) {
        var ctrl = this;
        ctrl.getMovieDetails = function (imdbID) {
            OmdbHttpFactory.getDetailsById(imdbID).then(function (movieDetail) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: './views/detailed-view.html',
                    size: 'lg',
                    controller: 'DetailedViewController',
                    resolve: {
                        movieDetail: function() {
                            return movieDetail;
                        }
                    }
                });
            })
        }
    }

    var app = angular.module('ngOMDBSearch'),
        config = {
            isolate: true,
            controller: ['ngOMDBSearchCore.factories.OmdbHttpFactory', '$uibModal', MovieListController],
            bindings: {
                title: "=",
                year: "=",
                imdbid: "="
            },
            templateUrl: "./views/list-item.html"
        };
    app.component("movielist", config);
}());
