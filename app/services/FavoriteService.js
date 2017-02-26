/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {

    /**
     * Favorite service. Will be used to get set favorite list. Check if movie is already a favorite
     * @param $localStorage
     * @param OmdbHttpFactory
     * @constructor
     */
    function FavoriteService($localStorage, OmdbHttpFactory) {
        var favoriteMovies = {};

        /**
         * on init function to load data from local storage.
         */
        function onInstantiate() {
            $localStorage.$default({
                movies: {}
            });
            angular.forEach($localStorage.movies, function (value, key) {
                if(!favoriteMovies[key]) {
                    favoriteMovies[key] = new OmdbHttpFactory.OmdbEntity(value)
                }
            })
        }

        /**
         * get list of favorite movies
         * @returns {*}
         */
        this.getFavoriteMovies = function () {
            return sort(Object.keys(favoriteMovies).map(function (key) {
                return favoriteMovies[key];
            }));
        };

        /**
         * Check if movie is a favorite.
         * @param id
         * @returns {boolean}
         */
        this.isFavoriteMovie = function (id) {
            return Object.keys(favoriteMovies).indexOf(id) == 0 ? true : false
        };

        /**
         * add to favorite list
         * @param movie
         * @returns {{}}
         */
        this.addFavoriteMovies = function (movie) {
            if (favoriteMovies[movie.imdbID]) {
                return;
            }
            if (Object.keys(favoriteMovies).length == OmdbHttpFactory.maxFavoriteLength) {
                deleteFavoriteMovies(this.getFavoriteMovies[0]);
            }
            $localStorage.movies[movie.imdbID] = movie;
            objOmdbEntity = new OmdbHttpFactory.OmdbEntity(movie);
            favoriteMovies[movie.imdbID] = objOmdbEntity;
            return favoriteMovies;
        };

        /**
         * Delete from favorite list in case limit is reached
         * @param movie
         * @returns {boolean}
         */
        function deleteFavoriteMovies(movie) {
            var key = movie.imdbID;
            delete $localStorage.movies[key];
            return delete favoriteMovies[key];
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
            '$localStorage',
            'ngOMDBSearchCore.factories.OmdbHttpFactory',
            FavoriteService
        ];
    app.service('FavoriteService', requires);
}());
