'use strict';

angular.module('SOSapp').factory('FeedService', ['$http',
    function ($http) {
        return {
            get: () => $http.get('/feeds').then(response => response.data),
        };
    }]);