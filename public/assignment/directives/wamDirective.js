/**
 * Created by Nikhil on 11/6/16.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);


    function wamSortable() {
        console.log("In wamSortable()")

        function linker(scope, element, attributes) {
            var start= -1;
            var end=-1;
            element
                .sortable({
                start:function(event,ui){
                   console.log($(ui.item).index())
                   start = $(ui.item).index()
                },
                stop:function(event,ui){
                    console.log($(ui.item).index())
                    end = $(ui.item).index()
                    scope.sortableController.sort(start,end);
                }
            });
        }

        return {
            scope :{},
            link: linker,
            controller: sortableController,
            controllerAs:'sortableController'
        }
    }

    function sortableController(WidgetService)
    {

        var vm = this;
        vm.sort = sort;

        function sort(start,end)
        {
            WidgetService.sort(start,end);
        }
    }

})();