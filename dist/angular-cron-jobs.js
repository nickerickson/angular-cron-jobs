/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v1.0.1 - 2015-03-30 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "	<span>Every: </span>\n" +
    "	<select class=\"cron-select\" ng-change=\"baseChange()\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.text for item in frequency\">\n" +
    "		\n" +
    "	</select>\n" +
    "	<div ng-show=\"myFrequency.base === 2\" class=\"select-options\">\n" +
    "		<span> at\n" +
    "		</span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.pastTheHour\" ng-options=\"item.value as item.value for item in pastTheHour\">\n" +
    "		</select>\n" +
    "		<span> past the hour\n" +
    "		</span>\n" +
    "	</div>\n" +
    "	<div ng-show=\"myFrequency.base === 3\" class=\"select-options\">\n" +
    "		<span>at </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.hourValue\" ng-options=\"item.value as item.value for item in hourValue\">\n" +
    "		</select>\n" +
    "		<span> : </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.minuteValue\" ng-options=\"item.value as item.value for item in minuteValue\">\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div ng-show=\"myFrequency.base === 4\" class=\"select-options\">\n" +
    "		<span>on\n" +
    "		</span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.dayValue\" ng-options=\"item.value as item.text for item in dayValue\">\n" +
    "		</select>\n" +
    "		<span>at </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.weekHourValue\" ng-options=\"item.value as item.value for item in hourValue\">\n" +
    "		</select>\n" +
    "		<span> : </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.weekMinuteValue\" ng-options=\"item.value as item.value for item in minuteValue\">\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div ng-show=\"myFrequency.base === 5\" class=\"select-options\">\n" +
    "		<span>on the </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"item.value as item.text for item in dayOfMonthValue\">\n" +
    "		</select>\n" +
    "		<span>at </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.weekHourValue\" ng-options=\"item.value as item.value for item in hourValue\">\n" +
    "		</select>\n" +
    "		<span> : </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.weekMinuteValue\" ng-options=\"item.value as item.value for item in minuteValue\">\n" +
    "		</select>\n" +
    "	</div>\n" +
    "	<div ng-show=\"myFrequency.base === 6\" class=\"select-options\">\n" +
    "		<span>on the </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"item.value as item.text for item in dayOfMonthValue\">\n" +
    "		</select>\n" +
    "		<span>of </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.monthValue\" ng-options=\"item.value as item.text for item in monthValue\">\n" +
    "		</select>\n" +
    "		<span>at </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.weekHourValue\" ng-options=\"item.value as item.value for item in hourValue\">\n" +
    "		</select>\n" +
    "		<span> : </span>\n" +
    "		<select class=\"cron-select\" ng-model=\"myFrequency.weekMinuteValue\" ng-options=\"item.value as item.value for item in minuteValue\">\n" +
    "		</select>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

angular.module('angular-cron-jobs').directive('cronSelection', ['cronService', function(cronService) {


    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            config: '=',
            output: '='
        },
        templateUrl: function(element, attributes) {
            return attributes.template || "cronselection.html";
        },
        link: function($scope, $element, $attrs) {

            $scope.showCustom = false;

            $scope.frequency = [{
                "value": 1,
                "text": "Minute"
            }, {
                "value": 2,
                "text": "Hour"
            }, {
                "value": 3,
                "text": "Day"
            }, {
                "value": 4,
                "text": "Week"
            }, {
                "value": 5,
                "text": "Month"
            }, {
                "value": 6,
                "text": "Year"
            }];

            if (typeof $scope.config === 'object' && !$scope.config.length) {
                var optionsKeyArray = Object.keys($scope.config.options);
                for (var i in optionsKeyArray) {
                    console.log('optionsKeyArray[i]: ', optionsKeyArray[i]);
                    var currentKeyArray = optionsKeyArray[i].split('allow');
                    var currentKey = currentKeyArray[1];
                    var originalKey = optionsKeyArray[i];
                    console.log('currentKey: ', currentKey);
                    if (!$scope.config.options[originalKey]) {
                        console.log('found false config option: ', $scope.config.options[originalKey]);
                        for (var b in $scope.frequency) {
                            console.log('entered frequency loop');
                            console.log('$scope.frequency[i]', $scope.frequency[b].text);
                            console.log('currentKey: ', currentKey);
                            if ($scope.frequency[b].text === currentKey) {
                                $scope.frequency.splice(b, 1);
                            }
                        }
                    }
                }
            }


            $scope.pastTheHour = [{
                "value": 0
            }, {
                "value": 5
            }, {
                "value": 10
            }, {
                "value": 15
            }, {
                "value": 20
            }, {
                "value": 25
            }, {
                "value": 30
            }, {
                "value": 35
            }, {
                "value": 40
            }, {
                "value": 45
            }, {
                "value": 50
            }, {
                "value": 55
            }];

            $scope.minuteValue = [{
                "value": 0
            }, {
                "value": 5
            }, {
                "value": 10
            }, {
                "value": 15
            }, {
                "value": 20
            }, {
                "value": 25
            }, {
                "value": 30
            }, {
                "value": 35
            }, {
                "value": 40
            }, {
                "value": 45
            }, {
                "value": 50
            }, {
                "value": 55
            }];

            $scope.hourValue = [{
                "value": 0
            }, {
                "value": 1
            }, {
                "value": 2
            }, {
                "value": 3
            }, {
                "value": 4
            }, {
                "value": 5
            }, {
                "value": 6
            }, {
                "value": 7
            }, {
                "value": 8
            }, {
                "value": 9
            }, {
                "value": 10
            }, {
                "value": 11
            }, {
                "value": 12
            }, {
                "value": 13
            }, {
                "value": 14
            }, {
                "value": 15
            }, {
                "value": 16
            }, {
                "value": 17
            }, {
                "value": 18
            }, {
                "value": 19
            }, {
                "value": 20
            }, {
                "value": 21
            }, {
                "value": 22
            }, {
                "value": 23
            }];

            $scope.dayValue = [{
                "value": 1,
                "text": "Sunday"
            }, {
                "value": 2,
                "text": "Monday"
            }, {
                "value": 3,
                "text": "Tuesday"
            }, {
                "value": 4,
                "text": "Wednesday"
            }, {
                "value": 5,
                "text": "Thursday"
            }, {
                "value": 6,
                "text": "Friday"
            }, {
                "value": 7,
                "text": "Saturday"
            }];

            $scope.dayOfMonthValue = [{
                "value": 1,
                "text": "1st"
            }, {
                "value": 2,
                "text": "2nd"
            }, {
                "value": 3,
                "text": "3rd"
            }, {
                "value": 4,
                "text": "4th"
            }, {
                "value": 5,
                "text": "5th"
            }, {
                "value": 6,
                "text": "6th"
            }, {
                "value": 7,
                "text": "7th"
            }, {
                "value": 8,
                "text": "8th"
            }, {
                "value": 9,
                "text": "9th"
            }, {
                "value": 10,
                "text": "10th"
            }, {
                "value": 11,
                "text": "11th"
            }, {
                "value": 12,
                "text": "12th"
            }, {
                "value": 13,
                "text": "13th"
            }, {
                "value": 14,
                "text": "14th"
            }, {
                "value": 15,
                "text": "15th"
            }, {
                "value": 16,
                "text": "16th"
            }, {
                "value": 17,
                "text": "17th"
            }, {
                "value": 18,
                "text": "18th"
            }, {
                "value": 19,
                "text": "19th"
            }, {
                "value": 20,
                "text": "20th"
            }, {
                "value": 21,
                "text": "21st"
            }, {
                "value": 22,
                "text": "22nd"
            }, {
                "value": 23,
                "text": "23rd"
            }, {
                "value": 24,
                "text": "24th"
            }, {
                "value": 25,
                "text": "25th"
            }, {
                "value": 26,
                "text": "26th"
            }, {
                "value": 27,
                "text": "27th"
            }, {
                "value": 28,
                "text": "28th"
            }, {
                "value": 29,
                "text": "29th"
            }, {
                "value": 30,
                "text": "30th"
            }, {
                "value": 31,
                "text": "31st"
            }];

            $scope.monthValue = [{
                "value": 1,
                "text": "January"
            }, {
                "value": 2,
                "text": "February"
            }, {
                "value": 3,
                "text": "March"
            }, {
                "value": 4,
                "text": "April"
            }, {
                "value": 5,
                "text": "May"
            }, {
                "value": 6,
                "text": "June"
            }, {
                "value": 7,
                "text": "July"
            }, {
                "value": 8,
                "text": "August"
            }, {
                "value": 9,
                "text": "September"
            }, {
                "value": 10,
                "text": "October"
            }, {
                "value": 11,
                "text": "November"
            }, {
                "value": 12,
                "text": "December"
            }];

            if ($scope.output) {
                $scope.myFrequency = cronService.setFrequency($scope.output);
            }
            $scope.baseChange = function() {
                console.log("base change")
                var base = $scope.myFrequency.base;
                $scope.myFrequency = {
                    base: base
                };
            };
            $scope.$watch('myFrequency', function(n) {
                if (n) {
                    $scope.output = cronService.setCron(n);
                    console.log('output: ', $scope.output);
                }
            }, true);
        }
    };
}]);
angular.module('angular-cron-jobs').factory('cronService', function() {

    var service = {};
    service.setCron = function(n) {
        var cron;
        switch (n.base) {
            case 1:
                //every minute
                cron = '* * * * *';
                break;
            case 2:
                //hourly
                n.pastTheHour = n.pastTheHour || 0;
                cron = n.pastTheHour + ' * * * *';
                break;
            case 3:
                //daily
                n.minuteValue = n.minuteValue || 0;
                n.hourValue = n.hourValue || 0;
                cron = n.minuteValue + ' ' + n.hourValue + ' * * *';
                break;
            case 4:
                //weekly
                n.weekMinuteValue = n.weekMinuteValue || 0;
                n.weekHourValue = n.weekHourValue || 0;
                n.dayValue = n.dayValue || 1;
                cron = n.weekMinuteValue + ' ' + n.weekHourValue + ' * * ' + (n.dayValue - 1);
                break;
            case 5:
                //monthly
                n.weekMinuteValue = n.weekMinuteValue || 0;
                n.weekHourValue = n.weekHourValue || 0;
                n.dayOfMonthValue = n.dayOfMonthValue || 1;
                cron = n.weekMinuteValue + ' ' + n.weekHourValue + ' ' + n.dayOfMonthValue + ' * *';
                break;
            case 6:
                //yearly
                n.weekMinuteValue = n.weekMinuteValue || 0;
                n.weekHourValue = n.weekHourValue || 0;
                n.dayOfMonthValue = n.dayOfMonthValue || 1;
                n.monthValue = n.monthValue || 1;
                cron = n.weekMinuteValue + ' ' + n.weekHourValue + ' ' + n.dayOfMonthValue + ' ' + n.monthValue + ' *';
                break;
        }

        return cron;
    };

    service.setFrequency = function(cron) {
        var cronPattern = cron.split(" ");
        console.log(cronPattern);
        var frequency = {};

        if (cronPattern[0] === "*") {
            frequency.base = 1;
        } else if (cronPattern[1] === "*") {
            frequency.base = 2;
            frequency.pastTheHour = parseInt(cronPattern[0]);
        } else if (cronPattern[2] === "*" && cronPattern[4] === "*") {
            frequency.base = 3;
            frequency.minuteValue = parseInt(cronPattern[0]);
            frequency.hourValue = parseInt(cronPattern[1]);
        } else if (cronPattern[2] === "*" && cronPattern[4] !== "*") {
            frequency.base = 4;
            frequency.weekMinuteValue = parseInt(cronPattern[0]);
            frequency.weekHourValue = parseInt(cronPattern[1]);
            frequency.dayValue = parseInt(cronPattern[4]);
        } else if (cronPattern[3] === "*") {
            frequency.base = 5;
            frequency.weekMinuteValue = parseInt(cronPattern[0]);
            frequency.weekHourValue = parseInt(cronPattern[1]);
            frequency.dayOfMonthValue = parseInt(cronPattern[2]);
        } else {
            frequency.base = 6;
            frequency.weekMinuteValue = parseInt(cronPattern[0]);
            frequency.weekHourValue = parseInt(cronPattern[1]);
            frequency.dayOfMonthValue = parseInt(cronPattern[2]);
            frequency.monthValue = parseInt(cronPattern[3]);
        }
        console.log(frequency)
        return frequency;
    };
    return service;
});