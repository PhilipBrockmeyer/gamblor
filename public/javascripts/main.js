require.config({
    baseUrl: 'javascripts',
    paths: {
        text: 'text',
        jquery: 'lib/jquery-2.1.1',
        knockout: 'lib/knockout',
    }
});

require(["jquery", "knockout", "views/gamelistView"], function($, ko, gamelist) {
    $(function () {
        var view = new gamelist($('#page-content')[0]);
    });
});