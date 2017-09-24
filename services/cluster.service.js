'use strict';

angular.module('SOSapp').factory('ClusterService', ['$http',
    function ($http) {
        return {
            get: () => $http.get('/cluters').then(response => response.data),
        };
    }]);