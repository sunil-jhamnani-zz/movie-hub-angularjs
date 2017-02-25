/**
 * Created by sunil.jhamnani on 2/23/17.
 */
(function () {
    function MovieListController(OmdbHttpFactory, $uibModal, toaster) {
        var ctrl = this;
        ctrl.getMovieDetails = function (omdbObject) {
            if (omdbObject.isCompleteObject) {
                openModel(omdbObject);
            }
            else {
                OmdbHttpFactory.getDetailsById(omdbObject.imdbID).then(function (movieDetail) {
                    openModel(movieDetail);
                }, function (error) {
                    toaster.pop('error', error.Error + " Error while calling api");
                });
            }
            function openModel(movieDetail) {
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
            }
        }
    }

    var app = angular.module('ngOMDBSearch'),
        config = {
            isolate: true,
            controller: ['ngOMDBSearchCore.factories.OmdbHttpFactory', '$uibModal', 'toaster', MovieListController],
            bindings: {
                movie: "=",
                index: "="
            },
            templateUrl: "./views/list-item.html"
        };
    app.component("movielist", config);
}());
