/**
 * Contains the basic class name tests
 * These tests validate each class name has been correctly applied
 */
describe('Angular-Paging: CSS Class Name Tests', function() {

    // Global Variable Declaration
    var scope, paging, compile;


    /**
    * This helps to quickly set scope values 
    * And update the paging directive per test
    */
    var recompile = function(){

        // Set our test template markup
        var template = 
            '<div paging ' +
                'page="currentPage" ' +
                'page-size="pageSize" ' +
                'total="total" ' +
                'dots="{{dots}}" ' +
                'ul-class="{{ulClass}}" ' +
                'active-class="{{activeClass}}" ' +
                'disabled-class="{{disabledClass}}" ' +
                'show-prev-next="{{showPrevNext}}" ' +
                'show-first-last="{{showFirstLast}}" ' +
                'text-next-class="{{textNextClass}}" ' +
                'text-prev-class="{{textPrevClass}}" ' +
                'text-first-class="{{textFirstClass}}" ' +
                'text-last-class="{{textLastClass}}" ' +
            '</div>';

        paging = compile(template)(scope);
        scope.$digest();
    };


    /**
    * Add our paging directive module to the tests 
    */
    beforeEach(module('bw.paging'));


    /**
    * Inject the default and setup values to the test
    */
    beforeEach(inject(function($rootScope, $compile) {

        // Set compile
        compile = $compile;

        // Set default scope values
        scope = $rootScope.$new();
        scope.currentPage = 1;
        scope.pageSize = 10;
        scope.total = 1000;
		scope.ulClass = 'pagination';
        scope.activeClass = 'active';
        scope.disabledClass = 'disabled';
		scope.showPrevNext = true;
		scope.showFirstLast = true;
        recompile();

    }));


	it('Should append the ul class to the un-ordered list', function(){
		var ul = paging.find('ul').eq(0);
		expect(ul.hasClass(scope.ulClass)).toEqual(true);
	}); 


	it('Should append the active class to the single corresponding active page list item', function(){

		// Baseline scope by Randomize which page is active
		scope.currentPage = Math.floor(Math.random() * 100) + 1;
		recompile();

		var count = 0;
		var spanText = 'unknown';
		var hasActiveClass = false;

		angular.forEach(paging.find('li'), function(item){
			var _item = angular.element(item);
			if(_item.hasClass(scope.activeClass)){
				count++;
				hasActiveClass = true;

				var span = _item.find('a').eq(0);
				spanText = parseInt(span.text(), 10);
			}
		});

		expect(count).toEqual(1);
		expect(hasActiveClass).toBe(true);
		expect(spanText).toEqual(scope.currentPage);

	}); 


	it('Should append the disabled class to the previous items in the list', function(){

		// Baseline scope
		scope.disabledClass = 'disabled';
		recompile();

		// Check first two items in list for disabled
		var items = paging.find('li');
		expect(items.eq(0).hasClass(scope.disabledClass)).toEqual(true);
		expect(items.eq(1).hasClass(scope.disabledClass)).toEqual(true);

	});


	it('Should append the disabled class to the next items in the list', function(){

		// Adjust current page to the end of the list
		scope.currentPage = 100;
		scope.disabledClass = 'disabled';
		recompile();

		// Check the last two items in list for disabled
		var items = paging.find('li');
		var count = items.length;
		expect(items.eq(count - 1).hasClass(scope.disabledClass)).toEqual(true);
		expect(items.eq(count - 2).hasClass(scope.disabledClass)).toEqual(true);

	});
	
	
	it('Should append the disabled class to the dots list item', function(){
		
		// Baseline scope 
		scope.currentPage = 10;
		recompile();
		
		var firstDotIndex = 4;
		var secondDotIndex = 10;
		
		var li = paging.find('li');
		var firstDot = li.eq(firstDotIndex);
		var secondDot = li.eq(secondDotIndex);
		
		expect(firstDot.hasClass(scope.disabledClass)).toEqual(true);
		expect(secondDot.hasClass(scope.disabledClass)).toEqual(true);
		
	});


    it('Should append the class items to the first, last, next, prev items', function(){
        
        scope.textFirstClass = 'first class';
        scope.textLastClass = 'last class';
        scope.textNextClass = 'next class';
        scope.textPrevClass = 'prev class';
        recompile();
        
        var items = paging.find('a');
        var count = items.length;
        
        var firstItem = items.eq(0);
        var prevItem = items.eq(1);
        var lastItem = items.eq(count - 1);
        var nextItem = items.eq(count - 2);
        
        expect(firstItem.hasClass(scope.textFirstClass)).toEqual(true);
        expect(prevItem.hasClass(scope.textPrevClass)).toEqual(true);
        expect(nextItem.hasClass(scope.textNextClass)).toEqual(true);
        expect(lastItem.hasClass(scope.textLastClass)).toEqual(true);
        
    });



});
