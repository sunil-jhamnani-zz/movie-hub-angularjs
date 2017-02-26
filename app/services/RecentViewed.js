/**
 * Created by sunil.jhamnani on 2/25/17.
 */
(function () {
    function RecentViewed($sessionStorage, OmdbHttpFactory) {
        var recentlyViewedMovies = {};

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

        this.getRecentlyViewedMovies = function () {
            return sort(Object.keys(recentlyViewedMovies).map(function (key) {
                return recentlyViewedMovies[key];
            }));
        };

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

        function deleteRecentlyViewedMovies(movie) {
            var key = movie.imdbID;
            delete $sessionStorage.movies[key];
            return delete recentlyViewedMovies[key];
        }

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
