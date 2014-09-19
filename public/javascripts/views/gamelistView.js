define(['jquery', 'knockout', 'viewmodels/gamelistViewmodel'], function ($, ko, viewmodel) {
    return function gamelistView() {
        var self = this;

        this.viewmodel = new viewmodel();

        this.init = function(element) {

        };
    };
});