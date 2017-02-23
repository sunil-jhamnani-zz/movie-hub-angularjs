/**
 * Created by sunil.jhamnani on 2/23/17.
 */

(function () {
    function OmdbHttpProvider() {
        var self = this;
        self.config = function (config) {
            angular.extend(self, config);
        };

        function OmdbHttpFactory($http, $log, $q) {

            if (!self.baseUrl) {
                $log.debug('OAuth key is not provided.');
            }

            var results = {
                total: 0
            };

            function urlFormattingForList(parameters) {
                return self.baseUrl + "s=" + parameters.name + "&y=" + parameters.year + "&page=" + parameters.page + "&type=movie&r=json"
            }

            function urlFormattingForEntity(id) {
                return self.baseUrl + "i=" + id + "&plot=full&r=json";
            }
            function OmdbEntity(obj) {
                angular.extend(this, obj);
            }

            function getSearchedMovieList(searchFilters) {
                var year = searchFilters.year ? searchFilters.year : "",
                    page = searchFilters.page ? searchFilters.page : "";

                var deferred = $q.defer();

                $http.get(urlFormattingForList({
                    name: searchFilters.name,
                    year: year,
                    page: page
                })).then(function (response) {
                    if (response.data.Response) {
                        var entities = response.data["Search"].map(function (entity) {
                            return new OmdbEntity(entity)
                        });
                        results.total = response.data["totalResults"];
                        deferred.resolve(entities)
                    }
                    else {
                        deferred.reject(response.data)
                    }
                }, function (error) {
                    deferred.reject(error)
                });

                return deferred.promise;
            }

            function getDetails(id) {
                var deferred = $q.defer();
                $http.get(urlFormattingForEntity(id)).then(function (response) {
                    var entity = new OmdbEntity(response.data);
                    deferred.resolve(entity)
                }, function (error) {
                    deferred.reject(error)
                });
                return deferred.promise;

            }

            return {
                getSearchedMovieList: getSearchedMovieList,
                getDetailsById: getDetails,
                results: results
            }
        }

        self.$get = [
            '$http',
            '$log',
            '$q',
            OmdbHttpFactory
        ];
    }

    var app = angular.module("ngOMDBSearch");
    app.provider("ngOMDBSearchCore.factories.OmdbHttpFactory", OmdbHttpProvider);
}());