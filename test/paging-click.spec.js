/**
 * Contains the click tests
 * These tests trigger the click event of the paging items
 */
describe('Angular-Paging: Click Tests', function() {

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
                'show-prev-next="{{showPrevNext}}" ' +
				'show-first-last="{{showFirstLast}}" ' +
                'paging-action="KarmTestAction(page, pageSize, total)"> ' +
            '</div>';

        // Force our test click action for all recompiles
        scope.KarmTestAction = function(page, pageSize, total){
            scope.paramPage = page;
            scope.paramPageSize = pageSize;
            scope.paramTotal = total;
        };

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
        scope.total = 50;
		scope.showPrevNext = true;
		scope.showFirstLast = true;
        recompile();

    }));



	it('Should detect the paging action for valid list items', function(){

		// where pageToClick != 1 as page 1 is the current page
		var pageToClick = 3;

		// Baseline our scope
		scope.showPrevNext = false;
		scope.showFirstLast = false;
		recompile();

		// Ensure inner scope params are falsy to begin
		expect(scope.paramPage).toBeFalsy();
		expect(scope.paramPageSize).toBeFalsy();
		expect(scope.paramTotal).toBeFalsy();

		// Hook in our click action
		var item = paging.find('a').eq(pageToClick - 1);
		item.triggerHandler('click');

		// Test that inner scope params have been updated
		expect(scope.paramPage).toEqual(pageToClick);
		expect(scope.paramPageSize).toEqual(scope.pageSize);
		expect(scope.paramTotal).toEqual(scope.total);
	});



	it('Should move to the first page when << is clicked', function(){

		// Set up the mock page 
		var page = 3;

		// Baseline our scope
		scope.currentPage = page;
		recompile();

		// Ensure current page is set 
		expect(scope.currentPage).toBe(page);

		// Hook in our click action
		var item = paging.find('a').eq(0);
		item.triggerHandler('click');

		// Test that current page has been updated 
		expect(scope.currentPage).toBe(1);

	});


	it('Should move to the previous page when < is clicked', function(){

		// Set up the mock page 
		// In this test we expect page to be > 1
		var page = 3;

		// Baseline our scope
		scope.currentPage = page;
		recompile();

		// Ensure current page is set to 
		expect(scope.currentPage).toBe(page);

		// Hook in our click action
		var item = paging.find('a').eq(1);
		item.triggerHandler('click');

		// Test that current page has been updated 
		expect(scope.currentPage).toBe(page - 1);

	});

	it('Should move to the last page when >> is clicked', function(){

		// Set up the mock page 
		var page = 1;

		// Baseline our scope
		scope.currentPage = page;
		recompile();

		// Ensure current page is set 
		expect(scope.currentPage).toBe(page);

		// Hook in our click action
		var items = paging.find('a');
		var count = items.length;
		var item = items.eq(count - 1);
		item.triggerHandler('click');

		// Test that current page has been updated 
		// We hard code in 5 as we know there will only be 5 pages
		expect(scope.currentPage).toBe(5);

	});


	it('Should move to the next page when > is clicked', function(){

		// Set up the mock page 
		// In this test we expect page to be > 1
		var page = 3;

		// Baseline our scope
		scope.currentPage = page;
		recompile();

		// Ensure current page is set
		expect(scope.currentPage).toBe(page);

		// Hook in our click action
		var items = paging.find('a');
		var count = items.length;
		var item = items.eq(count - 2);
		item.triggerHandler('click');

		// Test that current page has been updated 
		// We hard code in 5 as we know there will only be 5 pages
		expect(scope.currentPage).toBe(page + 1);

	});

});
