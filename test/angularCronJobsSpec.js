describe('AngularCronJobs', function() {
    var $compile, $rootScope, cronService;

    beforeEach(module('angular-cron-jobs'));


    beforeEach(inject(function(_$compile_, _$rootScope_, _cronService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        cronService = _cronService_;
    }));

    function createView(scope) {
        scope.config = {
            options: {
                allowMinute: false
            }
        };
        var element = angular.element('<cron-selection config="config"></cron-selection>');
        var elementCompiled = $compile(element)(scope);
        $rootScope.$digest();
        return elementCompiled;
    }

    it("cron should be set for every minute", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = 1;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('* * * * *');
    });

    it("cron should be set for every hour at 10 past", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = 2;
        scope.myFrequency.pastTheHour = 10;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 * * * *');
    });

    it("cron should be set for every day at 4:30 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = 3;
        scope.myFrequency.hourValue = 4;
        scope.myFrequency.minuteValue = 30;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('30 4 * * *');
    });

    it("cron should be set for every week on Monday at 12:45 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = 4;
        scope.myFrequency.weekHourValue = 12;
        scope.myFrequency.weekMinuteValue = 45;
        scope.myFrequency.dayValue = 2;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('45 12 * * 2');
    });

    it("cron should be set for every month on the 3rd at 6:55 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = 5;
        scope.myFrequency.weekHourValue = 18;
        scope.myFrequency.weekMinuteValue = 55;
        scope.myFrequency.dayOfMonthValue = 3;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('55 18 3 * *');
    });

    it("cron should be set for every year on the 5th of May at 4:10 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = 6;
        scope.myFrequency.weekHourValue = 4;
        scope.myFrequency.weekMinuteValue = 10;
        scope.myFrequency.dayOfMonthValue = 5;
        scope.myFrequency.monthValue = 5;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 4 5 5 *');
    });

});