define(['jquery', 'knockout', 'viewmodels/gameViewmodel'], function($,ko,game) {
    return function gamelistViewModel() {
        var self = this;

        this.games = ko.observableArray();

        this.load = function() {
            $.get('/api/v1/gamelists', function(data) {
                for (var i = 0; i < data[0].games.length; i++) {
                    self.games.push(new game(data[0].games[i]));
                }
            });
        };
    };
});