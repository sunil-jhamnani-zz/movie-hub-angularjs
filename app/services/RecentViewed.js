/**
 * Created by sunil.jhamnani on 2/25/17.
 */
(function () {

    /**
     * Recently viewed service. Will be used to get set recently viewed movies.
     * @param $sessionStorage
     * @param OmdbHttpFactory
     * @constructor
     */
    function RecentViewed($sessionStorage, OmdbHttpFactory) {
        var recentlyViewedMovies = {};

        /**
         * on init function to load data from session storage.
         */
        function onInstantiate() {
            $sessionStorage.$default({
                movies: {}
            });
            angular.forEach($sessionStorage.movies, function (value, key) {
                if(!recentlyViewedMovies[key]) {
                    recentlyViewedMovies[key] = new OmdbHttpFactory.OmdbEntity(value)
                }
            });
        }

        /**
         * get list of recently viewed movies
         * @returns {*}
         */
        this.getRecentlyViewedMovies = function () {
            return sort(Object.keys(recentlyViewedMovies).map(function (key) {
                return recentlyViewedMovies[key];
            }));
        };

        /**
         * add to recently viewed list
         * @param movie
         * @returns {{}}
         */
        this.addToRecentlyViewedMovies = function (movie) {
            if (recentlyViewedMovies[movie.imdbID]) {
                return;
            }
            if (Object.keys(recentlyViewedMovies).length == 10) {
                deleteRecentlyViewedMovies(this.getRecentlyViewedMovies()[0]);
            }
            $sessionStorage.movies[movie.imdbID] = movie;
            objOmdbEntity = new OmdbHttpFactory.OmdbEntity(movie);
            recentlyViewedMovies[movie.imdbID] = objOmdbEntity;
            return recentlyViewedMovies;
        };

        /**
         * Delete from recently viewed list in case limit is reached
         * @param movie
         * @returns {boolean}
         */
        function deleteRecentlyViewedMovies(movie) {
            var key = movie.imdbID;
            delete $sessionStorage.movies[key];
            return delete recentlyViewedMovies[key];
        }

        /**
         * Sort the movies on year before viewing and deleting data
         * @param arrToSort
         * @returns {*|Array.<T>}
         */
        function sort(arrToSort) {
            return arrToSort.sort(function (obj1, obj2) {
                return obj1.Year- obj2.Year
            });
        }

        onInstantiate();
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$sessionStorage',
            'ngOMDBSearchCore.factories.OmdbHttpFactory',
            RecentViewed
        ];
    app.service('RecentViewed', requires);
}());
