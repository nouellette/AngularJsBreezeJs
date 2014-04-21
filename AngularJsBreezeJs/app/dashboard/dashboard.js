(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, 
        ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Hot Towel Angular',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        
        vm.people = [];
        vm.attendeeCount = 0;
        vm.speakerCount = 0;
        vm.sessionCount = 0;
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getAttendeeCount(), getSessionCount(), getSpeakerCount(), getPeople()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getAttendeeCount() {
            return datacontext.getAttendeeCount().then(function (data) {
                return vm.attendeeCount = data;
            });
        }

        function getSessionCount() {
            return datacontext.getSessionCount().then(function (data) {
                return vm.sessionCount = data;
            });
        }

        function getSpeakerCount() {
            var speaker = datacontext.getSpeakerLocal();
            vm.speakerCount = speaker.length;
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
    }
})();