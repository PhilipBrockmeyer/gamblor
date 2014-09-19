define(['knockout'], function (ko) {
    return function gameViewModel(gameModel) {
        this.gameDate = ko.observable(gameModel.gameDate);
        this.gameNumber = ko.observable(gameModel.gameNumber);
        this.visitor = ko.observable(gameModel.visitor);
        this.home = ko.observable(gameModel.home);
    };
});