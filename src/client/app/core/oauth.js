(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('oauth', oauth);

    oauth.$inject = ['$http', 'currentUser'];

    /* @ngInject */
    function oauth($http, currentUser) {

        var retreiveToken = function (username, password) {
            return $http({
                url: 'http://178.62.58.84:8000/oauth2/token/',
                method: 'post',
                data: $.param({
                    //uses jQuery param to serialize data
                    client_id: '**********************',
                    client_secret: '*****************',
                    username: username,
                    password: password,
                    grant_type: 'password'
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function (response) {
                currentUser.setProfile(username, response.access_token);
                return 'success';
            }).error(function (e) {
                return 'error ' + e.error_description;
            });

        };

        return {
            retreiveToken: retreiveToken
        };
    }

})();