/**
* @ngDoc directive
* @name ng.directive:paging
*
* @description
* A directive to aid in paging large datasets 
* while requiring a small amount of page
* information.
*
* @element E
* 
*/
app.directive('paging', function() {


        // Assign null-able scope values from settings
        function setScopeValues(scope) {
		    scope.List = [];
            scope.page = parseInt(scope.page) || 1;
            scope.dots = scope.dots || '...';
			scope.ulClass = scope.ulClass || 'pagination';
			scope.adjacent = scope.adjacent || 2;
			scope.activeClass = scope.activeClass || 'active'; 
			scope.hideIfEmpty = scope.hideIfEmpty || false;
			scope.scrollTop = scope.scrollTop || true;
        }


        // Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
        function addDots(scope) {
            scope.List.push({
                value: scope.dots
            });
        }



        // Add Range of Numbers
        function addRange(start, finish, scope) {

            var i = 0;
            for (i = start; i <= finish; i++) {

                var item = {
                    value: i,
                    title: 'Page ' + i,
                    liClass: scope.page == i ? scope.activeClass : '',
                    onClick: function() {

                        if (scope.page == this.value) {
                            return;
                        }

                        var value = this.value;
                        scope.page = value;
                        
						if(scope.scrollTop){
							scrollTo(0,0);
						}
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
        function addLast(pageCount, scope) {
            addDots(scope);
            addRange(pageCount - 1, pageCount, scope);
        }


        // Main build function
        function build(scope) {
					
			// Block divide by 0 and empty page size
			if (!scope.pageSize || scope.pageSize < 0) {
                return;
            }
		
            // Assign scope values
            setScopeValues(scope);
						
            // local variables
            var start,
                size = scope.adjacent * 2,
                pageCount = Math.ceil(scope.total / scope.pageSize);
			
            // Block anything to big
            if (scope.page > pageCount) {
                scope.page = pageCount;
            }

            // Hide from page if we have 1 or less pages
            if (pageCount <= 1 && scope.hideIfEmpty) {
                scope.Hide = true;
            }

			// Calculate Counts and display
            if (pageCount < (5 + size)) {
                
				start = 1;
                addRange(start, pageCount, scope);
				
            } else {
                
				var finish;
                
				if (scope.page <= (1 + size)) {
                
					start = 1;
                    finish = 2 + size;
                    
					addRange(start, finish, scope);
                    addLast(pageCount, scope);
                
				} else if (pageCount - size > scope.page && scope.page > size) {
                    
					start = scope.page - scope.adjacent;
                    finish = scope.page + scope.adjacent;
					
                    addFirst(scope);
                    addRange(start, finish, scope);
                    addLast(pageCount, scope);
                
				} else {
                
					start = pageCount - (1 + size);
                    finish = pageCount;
                    
					addFirst(scope);
                    addRange(start, finish, scope);
                
				}
            }
        }


        // The actual angular directive return
        return {
            restrict: 'EA',
            scope: {
                page: '=',
                pageSize: '=',
                total: '=',
                dots: '@',
                hideIfEmpty: '@',
                ulClass: '@',
                adjacent: '@',
                activeClass: '@',
				scrollTop: '@'
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
            link: function(scope) {
                build(scope);
                scope.$watch('page', function() {
                    build(scope);
                });
            }
        };
    }
);