/**
 * Contains the basic show and hide tests
 * These tests ensure the structure of the paging directive is achieved
 */
describe('Angular-Paging: Display and Structure tests', function() {

    // Global Variable Declaration
    var scope, paging, compile;

    // Assign arrow just in case these become dynamic at some point
    var next = '>', last = '>>';
    var previous = '<', first = '<<';


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
        recompile();

    }));



	it('Should generate a single un-ordered list', function() {
		expect(paging.find('ul').length).toEqual(1);
	});


	it('Should generate generate list items', function() {
		var count = 0;
		angular.forEach(paging.find('li'), function(item){
			count++;
		});
		expect(count).toBeGreaterThan(0);
	});


	it('Should generate a single span within each list item', function() {
		angular.forEach(paging.find('li'), function(item){
			var _item = angular.element(item);
			expect(_item.find('a').length).toBe(1);
		});
	});

});
