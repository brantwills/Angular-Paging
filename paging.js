var app = angular.module('myApp', []);


/**
* @ngDoc directive
* @name ng.directive:paging
*
* @description
* The paging directive allows you to specify custom 
*
* @element E
* 
* todo: figure out best commenting structure 
*
*/
app.directive('paging', function () {

    // Private Count Variable
    var pageCount = 0,
        dots = '...',
        adjacent = 2,
        selectedClass = 'selected';


    // Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
    function addDots(scope) {
        scope.List.push({
            value: dots
        });
    }


    // Add Range of Numbers
    function addRange(start, finish, scope) {

        var i = 0;
        for (i = start; i <= finish; i++) {

            var item = {
                value: i,
                title: 'Page ' + i,
                class: scope.page == i ? selectedClass : '',
                click: function (page) {

                    scope.page = page;
                }
            }

            scope.List.push(item);
        }
    }


    // Add First Pages
    function addFirst(scope) {
        addRange(1, 2, scope);
        addDots(scope);
    }

    // Add Last Pages
    function addLast(scope) {
        addDots(scope);
        addRange(pageCount - 1, pageCount, scope);
    }


    function build(scope) {

        if (!scope.pagesize) {
            // to block divide by 0
            return;
        }

        if (!scope.page) {
            // default page is 1
            scope.page = 1;
        }
        
        // variables
        var size = adjacent * 2;  
        scope.page = parseInt(scope.page);
        scope.List = [];          
        pageCount = Math.ceil(scope.total / scope.pagesize);

        if (pageCount < (5 + size)) {
            addRange(start, pageCount, scope);
        }
        else {

            if (scope.page <= (1 + size)) {
                var start = 1;
                var finish = 2 + size;
                addRange(start, finish, scope);
                addLast(scope);
            }
            else if (pageCount - size > scope.page && scope.page > size) {
                var start = scope.page - adjacent;
                var finish = scope.page + adjacent;
                addFirst(scope);
                addRange(start, finish, scope);
                addLast(scope);
            }
            else {
                var start = pageCount - (1 + size);
                var finish = pageCount;
                addFirst(scope);
                addRange(start, finish, scope);
            }
        }
    }


    return {
        restrict: 'EA',
        scope: {
            page: '@',
            pagesize: '@',
            total: '@'
        },
        template:
        '<ul> \
			<li \
                title="{{Item.title}}" \
                class="{{Item.class}}" \
                ng-click="Item.click(Item.value)" \
                ng-repeat="Item in List track by $index"> \
                {{Item.value}} \
        </ul>',
        link: function (scope, element, attrs) {
            build(scope);

            scope.$watch('total', function () {
                build(scope);
            });

            scope.$watch('page', function () {
                build(scope);
            });

            scope.$watch('pagesize', function () {
                build(scope);
            });
        }
    }
});