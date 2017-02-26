/**
 * Created by sunil.jhamnani on 2/23/17.
 */
(function () {

    /**
     * MovieListController constructor function for list items on home page
     * @param OmdbHttpFactory
     * @param $uibModal
     * @param toaster
     * @constructor
     */
    function MovieListController(OmdbHttpFactory, $uibModal, toaster) {
        var ctrl = this;

        /**
         * Function will get the details of clicked movie and open it in a model popup
         * @param omdbObject
         */
        ctrl.getMovieDetails = function (omdbObject) {
            if (omdbObject.isCompleteObject) {
                openModel(omdbObject);
            }
            else {
                OmdbHttpFactory.getDetailsById(omdbObject.imdbID).then(function (movieDetail) {
                    openModel(movieDetail);
                }, function (error) {
                    toaster.pop('error', "Error while calling api");
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
