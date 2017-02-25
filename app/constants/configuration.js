/**
 * Created by sunil.jhamnani on 2/22/17.
 */
(function () {
    var app = angular.module('ngOMDBSearch');
    app.constant('Configuration', {
        API_URL: "http://www.omdbapi.com/?",
        MAX_FAVORITE_LENGTH: 10
    })
}());