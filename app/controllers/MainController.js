/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {

    function MainController($rootScope, $location) {
        $rootScope.go = function(path){
            $location.url(path);
        };
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$rootScope',
            '$location',
            MainController
        ];
    app.controller('MainController', requires);
}());