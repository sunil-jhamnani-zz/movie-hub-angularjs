/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {

    /**
     * MainController constructor function. Work as parent controller
     * @param $rootScope
     * @param $location
     * @constructor
     */
    function MainController($rootScope, $location) {

        /**
         * Redirect page to the specified route
         * @param path
         */
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