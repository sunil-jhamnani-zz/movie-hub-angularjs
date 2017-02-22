/**
 * Created by sunil.jhamnani on 2/22/17.
 */
(function () {
    var app = angular.module('ngOMDBSearch');
    app.constant('Configuration', {
        BY_TITLE_URL: "http://www.omdbapi.com/?s=%(name)s&y=%(year)s&type=movie&r=json",
        BY_ID_URL: "http://www.omdbapi.com/?i=%(id)s&plot=full&r=json&tomatoes=true"
    })
}());