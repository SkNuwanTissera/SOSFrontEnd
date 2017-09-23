'use strict';


angular.module('SOSapp').controller('FeedController',['$scope','FeedService',
    function ($scope,FeedService) {

        $scope.feeds=[
            {
                name:"Car Accident",
                severity:"3",
                place:"Nugegoda",
                noOfPeople:"4"
            },
            {
                name:"accident 2",
                severity:"3",
                place:"Nugegoda",
                noOfPeople:"2"

            },
            {
                name:"accident3",
                severity:"3",
                place:"Nugegoda",
                noOfPeople:"7"
            }
            ];
        function getNewsFeed() {
            FeedService.get().then(feeds => {
                $scope.feeds = feeds;
        });

        }
        getNewsFeed();
        $scope.X="nuwan";


    }]);

