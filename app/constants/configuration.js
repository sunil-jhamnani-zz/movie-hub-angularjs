/**
 * Created by sunil.jhamnani on 2/22/17.
 */
(function () {
    var app = angular.module('ngOMDBSearch');
    app.constant('Configuration', {

        //OMDB free apo URL
        API_URL: "http://www.omdbapi.com/?",

        //Max length of movies to be added as favorite. The first one will be removed if the limit is reached
        MAX_FAVORITE_LENGTH: 10
    })
}());