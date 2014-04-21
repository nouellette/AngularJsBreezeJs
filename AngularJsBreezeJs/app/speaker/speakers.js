(function () {
    'use strict';

    var controllerId = 'speakers';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['common', 'config', 'datacontext', speakers]);

    function speakers(common, config, datacontext) {
        var vm = this;
        var keyCodes = config.keyCodes;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.speakers = [];
        vm.refresh = refresh;
        vm.filteredSpeakers = [];
        vm.search = search;
        vm.speakerSearch = '';
        vm.title = 'Speakers';

        activate()

        function activate() {
            common.activateController([getSpeakers()], controllerId)
                .then(function () { log('Activated Speakers View'); });
        }

        function getSpeakers(forceRefresh) {
            return datacontext.getSpeakerPartials(forceRefresh).then(function (data) {
                vm.speakers = data
                applyFilter();
                return vm.speakers;
            });
        }

        function refresh() {
            getSpeakers(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.speakerSearch = '';
            }
            applyFilter();
        }

        function applyFilter() {
            vm.filteredSpeakers = vm.speakers.filter(speakerFilter);
        }

        function speakerFilter(speaker) {
            var isMatch = vm.speakerSearch ? common.textContains(speaker.fullName, vm.speakerSearch) : true;                
            return isMatch;
        }
    }
})();
