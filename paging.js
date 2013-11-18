var app = angular.module('myApp', []);


/**
* @ngDoc directive
* @name ng.directive:paging
*
* @description
* The paging directive allows you to specify custom 
*
* @element E
* @
*/
app.directive('paging',function () {
    
    // Private Count Variable
    var pageCount = 0,
        dots = '...',
        adjacent = 3,
        selectedClass = 'selected';
    
    
    // Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
    function addDots(scope) {
        scope.List.push({
        	value: dots
        });
    }
    
    
    // Add Range of Numbers
    function addRange(start, finish, scope) {
                        
        for (var i = start; i <= finish; i++) {
            
            var item = {
             	value: i,
                title: 'Page ' + i,
                class: scope.page == i ? selectedClass : ''
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
    
    
    function build(scope){
        
        if(!scope.pagesize) return;
        if(!scope.page) scope.page = 1;
        scope.page = parseInt(scope.page);
        
        var start = 1,
            _adjacent = adjacent * 2,
            finish = Math.ceil(scope.total / scope.pagesize); 	
        
        scope.List = [];
        pageCount = finish;
        

        if (pageCount < (5 + _adjacent)) {
            addRange(start, finish, scope);
        }
        else {
            
            if (scope.page < (1 + _adjacent)) {
                finish = 2 + _adjacent;
                addRange(start, finish, scope);
                addLast(scope);
            }
            else if (pageCount - _adjacent > scope.page && scope.page > _adjacent) {
                
                        
                start = scope.page - _adjacent;
                finish = scope.page + _adjacent;
                
                addFirst(scope);
                addRange(start, finish, scope);
                addLast(scope);
            }
            else {
                start = finish - (2 + _adjacent);
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
            total: '@',
            click: '&'
        },
        template: 
        '<ul>' + 
        	'<li title="{{Item.title}}" class="{{Item.class}}" ng-repeat="Item in List track by $index">{{Item.value}}' +
        '</ul>',
        link : function(scope, element, attrs)
        {
            build(scope);
            
            scope.$watch('total', function(){
             	build(scope);   
            });
            
            scope.$watch('page', function(){
               	build(scope); 
            });
            
            scope.$watch('pagesize', function(){
               	build(scope); 
            });
        }
    }
});