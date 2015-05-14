/**
 * @ngDoc directive
 * @name ng.directive:paging
 *
 * @description
 * A directive to aid in paging large datasets
 * while requiring a small amount of page
 * information.
 *
 * @element EA
 *
 */
angular.module('brantwills.paging', []).directive('paging', function () {


    /**
    * Assign null-able scope values from settings
    * Feel free to tweak / fork these for your application
    *
    * @param {Object} scope - The local directive scope object
    * @param {Object} attrs - The local directive attribute object
    */ 
    function setScopeValues(scope, attrs) {

        scope.List = [];
        scope.Hide = false;
        scope.dots = scope.dots || '...';
        scope.page = parseInt(scope.page) || 1;
        scope.total = parseInt(scope.total) || 0;
        scope.ulClass = scope.ulClass || 'pagination';
        scope.adjacent = parseInt(scope.adjacent) || 2;
        scope.activeClass = scope.activeClass || 'active';
        scope.disabledClass = scope.disabledClass || 'disabled';

        scope.scrollTop = scope.$eval(attrs.scrollTop);
        scope.hideIfEmpty = scope.$eval(attrs.hideIfEmpty);
        scope.showPrevNext = scope.$eval(attrs.showPrevNext);

    }


    /**
    * Validate and clean up any scope values
    * This happens after we have set the scope values
    *
    * @param {Object} scope - The local directive scope object
    * @param {int} pageCount - The last page number or total page count 
    */
    function validateScopeValues(scope, pageCount) {

        // Block where the page is larger than the pageCount
        if (scope.page > pageCount) {
            scope.page = pageCount;
        }

        // Block where the page is less than 0
        if (scope.page <= 0) {
            scope.page = 1;
        }

        // Block where adjacent value is 0 or below
        if (scope.adjacent <= 0) {
            scope.adjacent = 2;
        }

        // Hide from page if we have 1 or less pages
        // if directed to hide empty
        if (pageCount <= 1) {
            scope.Hide = scope.hideIfEmpty;
        }
    }


    /**
    * Assign the method action to take when a page is clicked
    *
    * @param {Object} scope - The local directive scope object
    * @param {int} page - The current page of interest
    */
    function internalAction(scope, page) {

        // Block clicks we try to load the active page
        if (scope.page == page) { return; }

        // Update the page in scope 
        scope.page = page;

        // Pass our parameters to the paging action
        scope.pagingAction({
            page: scope.page,
            pageSize: scope.pageSize,
            total: scope.total
        });

        // If allowed scroll up to the top of the page
        if (scope.scrollTop) {
            scrollTo(0, 0);
        }
    }


    /**
    * Add the first and previous button text if desired   
    * This method will simply return if the scope.showPrevNext is false
    * This method will simply return if there are no pages to display
    *
    * @param {Object} scope - The local directive scope object
    * @param {int} pageCount - The last page number or total page count 
    */
    function addPrev(scope, pageCount) {

        // Ignore if we are not showing
        // or there are no pages to display
        if (!scope.showPrevNext || pageCount < 1) { return; }

        // Calculate the previous page and if the click actions are allowed
        // blocking and disabling where page <= 0
        var disabled = scope.page - 1 <= 0;
        var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

        var first = {
            value: '<<',
            title: 'First Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled) {
                    internalAction(scope, 1);
                }
            }
        };

        var prev = {
            value: '<',
            title: 'Previous Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled) {
                    internalAction(scope, prevPage);
                }
            }
        };

        scope.List.push(first);
        scope.List.push(prev);
    }


    /**
    * Add the next and last button text if desired
    * This method will simply return if the scope.showPrevNext is false
    * This method will simply return if there are no pages to display
    *
    * @param {Object} scope - The local directive scope object
    * @param {int} pageCount - The last page number or total page count 
    */
    function addNext(scope, pageCount) {

        // Ignore if we are not showing 
        // or there are no pages to display
        if (!scope.showPrevNext || pageCount < 1) { return; }

        // Calculate the next page number and if the click actions are allowed
        // blocking where page is >= pageCount
        var disabled = scope.page + 1 > pageCount;
        var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

        var last = {
            value: '>>',
            title: 'Last Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled){
                    internalAction(scope, pageCount);
                }
            }
        };

        var next = {
            value: '>',
            title: 'Next Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled){
                    internalAction(scope, nextPage);
                }
            }
        };

        scope.List.push(next);
        scope.List.push(last);
    }


    /**
    * Adds a range of numbers to our list 
    * The range is dependent on the start and finish parameters
    *
    * @param {int} start - The start of the range to add to the paging list
    * @param {int} finish - The end of the range to add to the paging list 
    * @param {Object} scope - The local directive scope object
    */
    function addRange(start, finish, scope) {

        var i = 0;
        for (i = start; i <= finish; i++) {

            var item = {
                value: i,
                title: 'Page ' + i,
                liClass: scope.page == i ? scope.activeClass : '',
                action: function () {
                    internalAction(scope, this.value);
                }
            };

            scope.List.push(item);
        }
    }


    /**
    * Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
    * This is my favorite function not going to lie
    *
    * @param {Object} scope - The local directive scope object
    */
    function addDots(scope) {
        scope.List.push({
            value: scope.dots
        });
    }


    /**
    * Add the first or beginning items in our paging list  
    * We leverage the 'next' parameter to determine if the dots are required
    *
    * @param {Object} scope - The local directive scope object
    * @param {int} next - the next page number in the paging sequence
    */
    function addFirst(scope, next) {
        addRange(1, 2, scope);

        // We ignore dots if the next value is 3
        // ie: 1 2 [...] 3 4 5 becomes just 1 2 3 4 5 
        if(next != 3){
            addDots(scope);
        }
    }

    /**
    * Add the last or end items in our paging list  
    * We leverage the 'prev' parameter to determine if the dots are required
    *
    * @param {int} pageCount - The last page number or total page count 
    * @param {Object} scope - The local directive scope object
    * @param {int} prev - the previous page number in the paging sequence
    */
    // Add Last Pages
    function addLast(pageCount, scope, prev) {

        // We ignore dots if the previous value is one less that our start range
        // ie: 1 2 3 4 [...] 5 6  becomes just 1 2 3 4 5 6 
        if(prev != pageCount - 2){
            addDots(scope);
        }

        addRange(pageCount - 1, pageCount, scope);
    }



    /**
    * The main build function used to determine the paging logic
    * Feel free to tweak / fork values for your application
    *
    * @param {Object} scope - The local directive scope object
    * @param {Object} attrs - The local directive attribute object
    */ 
    function build(scope, attrs) {

        // Block divide by 0 and empty page size
        if (!scope.pageSize || scope.pageSize < 0) { return; }

        // Determine the last page or total page count
        var pageCount = Math.ceil(scope.total / scope.pageSize);

        // Set the default scope values where needed
        setScopeValues(scope, attrs);

        // Validate the scope values to protect against strange states
        validateScopeValues(scope, pageCount);

        // Create the beginning and end page values 
        var start, finish;

        // Assign the minimum pages required to activate dot break logic
        var minPagesRequired = 10;

        // Calculate the full adjacency value
        var fullAdjacentSize = scope.adjacent * 2;


        // Add the Next and Previous buttons to our list
        addPrev(scope, pageCount);

        // If the page count is less than or equal to the minimum required amount
        // Then we simply display all the pages, Otherwise we calculate the proper paging display
        if (pageCount <= minPagesRequired) {

            start = 1;
            addRange(start, pageCount, scope);

        } else {

            // Determine if we are showing the beginning of the paging list 
            // We know it is the beginning if the page - adjacent is <= 2
            // 2 is hard coded since we always wish to display page 1 and 2 before the dots
            if (scope.page - scope.adjacent <= 2) {

                start = 1;
                finish = 2 + (fullAdjacentSize + 1);

                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            } 

            // Determine if we are showing the middle of the paging list
            // We know already we are either in the middle or at the end since the beginning is ruled out above
            // So we simply check if we are not at the end 
            // Again 2 is hard coded as we always display two pages after the dots
            else if (scope.page < pageCount - (scope.adjacent + 2)) {

                start = scope.page - scope.adjacent;
                finish = scope.page + scope.adjacent;

                addFirst(scope, start);
                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            } 

            // If nothing else we conclude we are at the end of the paging list
            // We know this since we have already ruled out the beginning and middle above
            else {

                start = pageCount - (2 + fullAdjacentSize);
                finish = pageCount;

                addFirst(scope, start);
                addRange(start, finish, scope);

            }
        }

        // Add the next and last buttons to our paging list
        addNext(scope, pageCount);

    }


    /**
    * The angular return value required for the directive
    * Feel free to tweak / fork values for your application
    */ 
    return {

        // Restrict to elements and attributes
        restrict: 'EA',

        // Assign the angular scope attribute formatting
        scope: {
            page: '=',
            pageSize: '=',
            total: '=',
            dots: '@',
            hideIfEmpty: '@',
            ulClass: '@',
            activeClass: '@',
            disabledClass: '@',
            adjacent: '@',
            scrollTop: '@',
            showPrevNext: '@',
            pagingAction: '&'
        },

        // Assign the angular directive template HTML
        template: 
            '<ul ng-hide="Hide" ng-class="ulClass"> ' +
                '<li ' +
                    'title="{{Item.title}}" ' +
                    'ng-class="Item.liClass" ' +
                    'ng-click="Item.action()" ' +
                    'ng-repeat="Item in List"> ' +
                        '<span ng-bind="Item.value"></span> ' +
                '</li>' +
            '</ul>',

        // Link the directive to enable our scope watch values
        link: function (scope, element, attrs) {
            
            // Hook in our watched items 
            scope.$watchCollection('[page,pageSize,total]', function () {
                build(scope, attrs);
            });
        }
    };
});
