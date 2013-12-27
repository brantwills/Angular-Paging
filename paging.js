/**
* Sample app declaration
*
*/
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
* @todo
* figure out best commenting structure 
*
*/
app.directive('paging', function () {

    // Private Count Variable
    var pageCount = 0,
        dots = '...',
        adjacent = 2,
		ulClass = 'pagination',
        activeClass = 'active';


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
                liClass: scope.page == i ? activeClass : '',
                onClick: function () {

                    if (scope.page == this.value) {
                        return;
                    }

                    var value = this.value;
                    scope.page = value;
                    scrollTo(0);
                }
            };

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

        if (!scope.pagesize || scope.pagesize < 0) {
            // to block divide by 0
            return;
        }

        if (!scope.page) {
            // default page is 1
            scope.page = 1;
        }
		
		// variables
        var start,
            size = adjacent * 2;

        scope.Hide = false;
		scope.ulClass = ulClass;
        scope.page = parseInt(scope.page);
        scope.List = [];
        pageCount = Math.ceil(scope.total / scope.pagesize);

		
		// Block anything to big
		if(scope.page > pageCount)
		{
			scope.page = pageCount;
		}
		

        // Hide from page if we have 1 or less pages
        if (pageCount <= 1) {
            scope.Hide = true;
            return;
        }
		
		
        if (pageCount < (5 + size)) {
            start = 1;
            addRange(start, pageCount, scope);
        }
        else {
            var finish;
            if (scope.page <= (1 + size)) {
                start = 1;
                finish = 2 + size;
                addRange(start, finish, scope);
                addLast(scope);
            }
            else if (pageCount - size > scope.page && scope.page > size) {
                start = scope.page - adjacent;
                finish = scope.page + adjacent;
                addFirst(scope);
                addRange(start, finish, scope);
                addLast(scope);
            }
            else {
                start = pageCount - (1 + size);
                finish = pageCount;
				addFirst(scope);
                addRange(start, finish, scope);
            }
        }
    }

 


    return {
        restrict: 'EA',
        scope: {
            page: '=',
            pagesize: '=',
            total: '='
        },
        template:
            '<ul ng-hide="Hide" class="{{ulClass}}"> ' +
                '<li ' +
                    'title="{{Item.title}}" ' +
                    'ng-class="Item.liClass" ' +
                    'ng-click="Item.onClick()" ' +
                    'ng-repeat="Item in List"> ' +
                '<span>{{Item.value}}</span> ' +
            '</ul>',
        link: function (scope) {
			build(scope);

            scope.$watch('page', function (value) {
				build(scope);
            });
        }
    }
});