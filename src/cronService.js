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
        return frequency;
    };
    return service;
});