/**
 * Created by sunil.jhamnani on 2/23/17.
 */

(function () {
    function OmdbHttpProvider() {
        var self = this;
        self.config = function (config) {
            angular.extend(self, config);
        };

        function OmdbHttpFactory($http, $log, $q, $localStorage) {

            if (!self.baseUrl) {
                $log.debug("Base Url is not provided in the angular constants");
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
                var deferred = $q.defer();
                searchFilters = searchFilters || $localStorage.savedSearchFilters;
                if (!searchFilters) {
                    return deferred.promise;
                }
                searchFilters.year = searchFilters.year ? searchFilters.year : "";
                searchFilters.page = searchFilters.page ? searchFilters.page : 1;
                $localStorage.savedSearchFilters = searchFilters;

                $http.get(urlFormattingForList(searchFilters)).then(function (response) {
                    if (response.data.Response == "True") {
                        var entities = response.data["Search"].map(function (entity) {
                            entity["isCompleteObject"] = false;
                            return new OmdbEntity(entity)
                        });
                        results.total = response.data["totalResults"];
                        results.searchFilters = searchFilters
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
                    if (response.data.Response == "True"){
                        var entity = new OmdbEntity(response.data);
                        entity["isCompleteObject"] = true;
                        deferred.resolve(entity)
                    }
                    else {
                        deferred.reject(response.data)
                    }
                }, function (error) {
                    deferred.reject(error)
                });
                return deferred.promise;

            }

            function clearFilters() {
                delete $localStorage.savedSearchFilters;
            }

            return {
                OmdbEntity: OmdbEntity,
                maxFavoriteLength: self.maxFavoriteLength,
                getSearchedMovieList: getSearchedMovieList,
                getDetailsById: getDetails,
                clearFilters: clearFilters,
                results: results
            }
        }

        self.$get = [
            '$http',
            '$log',
            '$q',
            '$localStorage',
            OmdbHttpFactory
        ];
    }

    var app = angular.module("ngOMDBSearch");
    app.provider("ngOMDBSearchCore.factories.OmdbHttpFactory", OmdbHttpProvider);
}());