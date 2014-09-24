define(['jquery', 'knockout', 'viewmodels/gameViewmodel'], function ($, ko, game) {
    function gamelistViewModel() {
        this.games = ko.observableArray();
    }
    
    gamelistViewModel.prototype = {
        load: function () {
            var self = this;
            
            $.get('/api/v1/gamelists', function (data) {
                for (var i = 0; i < data.games.length; i++) {
                    self.games.push(new game(data.games[i]));
                }
            });
        }
    };
    
    return gamelistViewModel;
});