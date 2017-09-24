'use strict';


angular.module('SOSapp')

    .controller('FeedController',['$scope','FeedService', '$pusher',
    function ($scope,FeedService, $pusher) {
        $scope.feeds = [];
        var client = new Pusher("93c03fd6dd15021f034f",{
            cluster: 'ap2',
            encrypted: true
        });
        var pusher = $pusher(client);
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            console.log(data.message.responses[0].labelAnnotations[0]);
            $scope.labels = data.message.responses[0].labelAnnotations;
          //  console.log($scope.labels.labelAnnotations[0]);
            console.log(data);
            $scope.feeds.push({
                name:"Car Accident",
                severity:"3",
                place:"Nugegoda",
                noOfPeople:"4",
                tags:$scope.labels,
                image: data.image
            });
        });


        function getNewsFeed() {
            FeedService.get().then(feeds => {
                $scope.feeds = feeds;
        });

        }
        getNewsFeed();
        $scope.X="nuwan";


    }]);

