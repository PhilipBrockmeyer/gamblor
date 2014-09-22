define(['jquery', 'knockout', 'viewmodels/gamelistViewmodel', 'text!templates/gamelists.html'], function ($, ko, viewmodel, template) {
    function gamelistView(element) {
        this.element = element;
        this.$el = $(element);
        this.$el.html(template);

        this.viewmodel = new viewmodel();
        this.viewmodel.load();
        
        ko.applyBindings(this.viewmodel, this.element);
    }

    gamelistView.prototype = {
        init: function () {
            
        }
    };

    return gamelistView;

});