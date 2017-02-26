/**
 * Created by sunil.jhamnani on 2/23/17.
 */

(function () {
    function OmdbHttpProvider() {
        var self = this;
        self.config = function (config) {
            angular.extend(self, config);
        };

        /**
         * Service function. It exposes api to be used to get the movie details.
         * @param $http
         * @param $log
         * @param $q
         * @param $localStorage
         * @returns {{OmdbEntity: OmdbEntity, maxFavoriteLength: *, getSearchedMovieList: getSearchedMovieList, getDetailsById: getDetails, clearFilters: clearFilters, results: {total: number}}}
         * @constructor
         */
        function OmdbHttpFactory($http, $log, $q, $localStorage) {

            if (!self.baseUrl) {
                $log.debug("Base Url is not provided in the angular constants");
            }

            var results = {
                total: 0
            };

            /**
             * Build query used to fetch list of movies based on query parameters
             * @param parameters
             * @returns {string}
             */
            function buildQueryForList(parameters) {
                return self.baseUrl + "s=" + parameters.name + "&y=" + parameters.year + "&page=" + parameters.page + "&type=movie&r=json"
            }

            /**
             * Build query used to fetch details of selected movie based on imdb ID
             * @param id
             * @returns {string}
             */
            function buildQueryForEntity(id) {
                return self.baseUrl + "i=" + id + "&plot=full&r=json";
            }

            /**
             * Represents a movie object
             * @param obj
             * @constructor
             */
            function OmdbEntity(obj) {
                angular.extend(this, obj);
            }

            /**
             * Send GET request to get list of movies. Returns promise object
             * @param searchFilters
             * @returns {*}
             */
            function getSearchedMovieList(searchFilters) {
                var deferred = $q.defer();
                searchFilters = searchFilters || $localStorage.savedSearchFilters;
                if (!searchFilters) {
                    return deferred.promise;
                }
                searchFilters.year = searchFilters.year ? searchFilters.year : "";
                searchFilters.page = searchFilters.page ? searchFilters.page : 1;
                $localStorage.savedSearchFilters = searchFilters;

                $http.get(buildQueryForList(searchFilters)).then(function (response) {
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
                        $log.debug(response.data);
                        deferred.reject(response.data)
                    }
                }, function (error) {
                    $log.debug(error);
                    deferred.reject(error)
                });

                return deferred.promise;
            }

            /**
             * Send GET request to get details of selected movie.
             * @param id
             * @returns {*}
             */
            function getDetails(id) {
                var deferred = $q.defer();
                $http.get(buildQueryForEntity(id)).then(function (response) {
                    if (response.data.Response == "True") {
                        var entity = new OmdbEntity(response.data);
                        entity["isCompleteObject"] = true;
                        deferred.resolve(entity)
                    }
                    else {
                        $log.debug(response.data);
                        deferred.reject(response.data)
                    }
                }, function (error) {
                    $log.debug(error);
                    deferred.reject(error)
                });
                return deferred.promise;

            }

            /**
             * Clear all the filters stored in local storage
             */
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