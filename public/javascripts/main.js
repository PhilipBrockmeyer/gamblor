require.config({
    baseUrl: 'javascripts',
    paths: {
        jquery: 'lib/jquery-2.1.1',
        knockout: 'lib/knockout',
    }
});

require(["jquery", "knockout", "viewmodels/gamelistViewmodel"], function($, ko, gamelist) {
    $(function() {
        var vm = new gamelist();
        vm.load();
    });
});