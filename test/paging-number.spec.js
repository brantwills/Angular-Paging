/**
 * Contains the number and symbol formatting tests
 * These tests ensure the paging layout is correct for the specific paging cases we handle
 * Includes things like first and last arrows and dot displays
 */
describe('Angular-Paging: Number and Symbol Formatting Tests', function() {

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
                'adjacent="{{adjacent}}" ' +
                'dots="{{dots}}" ' +
				'show-prev-next="{{showPrevNext}}" ' +
				'show-first-last="{{showFirstLast}}" ' +
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
        scope.adjacent = 2;
		scope.showPrevNext = false;
		scope.showFirstLast = false;
        recompile();

    }));


	it('Should correctly display the beginning page items', function(){
		
		// Setup and perform test
		var sequence = [];
		var correctSequence = ['1','2','3','4','5','6','7','...','99','100'];

		angular.forEach(paging.find('a'), function(span){
			var _span = angular.element(span);
			sequence.push(_span.text());
		});

		expect(sequence).toEqual(correctSequence);

	});



	it('Should correctly display the middle page items', function(){

		// Baseline our scope
		scope.currentPage = 50;
		recompile();

		// Setup and perform test
		var sequence = [];
		var correctSequence = ['1','2','...','48','49','50','51','52','...','99','100'];

		angular.forEach(paging.find('a'), function(span){
			var _span = angular.element(span);
			sequence.push(_span.text());
		});

		expect(sequence).toEqual(correctSequence);

	});


	it('Should correctly display the ending page items', function(){

		// Baseline our scope
		scope.currentPage = 100;
		recompile();

		// Setup and perform test
		var sequence = [];
		var correctSequence = ['1','2','...','94','95','96','97','98','99','100'];

		angular.forEach(paging.find('a'), function(span){
			var _span = angular.element(span);
			sequence.push(_span.text());
		});

		expect(sequence).toEqual(correctSequence);

	});


	it('Should correctly display the small set of page items without dots', function(){

		// Baseline our scope
		scope.currentPage = 1;
		scope.pageSize = 10;
		scope.total = 50;
		recompile();

		// Setup and perform test
		var sequence = [];
		var correctSequence = ['1','2','3','4','5'];

		angular.forEach(paging.find('a'), function(span){
			var _span = angular.element(span);
			sequence.push(_span.text());
		});

		expect(sequence).toEqual(correctSequence);

	});

	it('Should never display a number twice or a number out of range for the beginning', function(){
		
		// Baseline our scope
		scope.currentPage = 1;
		scope.pageSize = 1;
		scope.total = 100;
		recompile();  
			
		for(var size = 1; size <= 100; size++){
			
			var sequence = [];  
			scope.pageSize = size;
			var pageCount = Math.ceil(scope.total / scope.pageSize);
			scope.$digest();    
				
			angular.forEach(paging.find('a'), function(span){
				var _span = angular.element(span);
				if(!isNaN(_span.text())){
					var page = parseInt(_span.text()); 
					expect(page > 0).toBeTruthy();
					expect(page <= pageCount).toBeTruthy();
				}
				expect(sequence).not.toContain(_span.text());
				sequence.push(_span.text());
			});   
		}
	});


	it('Should never display a number twice or a number out of range in the middle', function(){
		
		// Baseline our scope
		scope.currentPage = 50;
		scope.pageSize = 1;
		scope.total = 100;
		recompile();  
			
		for(var size = 1; size <= 100; size++){
			
			var sequence = [];
			scope.pageSize = size;
			scope.currentPage = Math.ceil((scope.total / scope.pageSize) / 2);
			var pageCount = Math.ceil(scope.total / scope.pageSize);
			scope.$digest();    
			
			angular.forEach(paging.find('a'), function(span){
				var _span = angular.element(span);                    
				expect(sequence).not.toContain(_span.text());
				
				if(!isNaN(_span.text())){
					var page = parseInt(_span.text());
					expect(page > 0).toBeTruthy();
					expect(page <= pageCount).toBeTruthy();
					sequence.push(_span.text());  
				}
			});   
		}
	});
	

	it('Should never display a number twice or a number out of range at the end', function(){
		
		// Baseline our scope
		scope.currentPage = 100;
		scope.pageSize = 1;
		scope.total = 100;
		recompile();  
			
		for(var size = 1; size <= 1000; size++){
			
			var sequence = [];  
			scope.pageSize = size;
			scope.currentPage = 100;
			var pageCount = Math.ceil(scope.total / scope.pageSize);
			scope.$digest();    
			
			angular.forEach(paging.find('a'), function(span){
				var _span = angular.element(span);
				if(!isNaN(_span.text())){
					var page = parseInt(_span.text());
					expect(page > 0).toBeTruthy();
					expect(page <= pageCount).toBeTruthy();
				}
				expect(sequence).not.toContain(_span.text());
				sequence.push(_span.text());    
			});   
		}
	});


	it('Should display next and previous arrows correctly', function(){

		// Baseline our scope
		scope.currentPage = 1;
		scope.pageSize = 10;
		scope.total = 50;
		scope.showPrevNext = true;
		scope.showFirstLast = true;
		recompile();

		// Setup and perform test
		var sequence = [];
		var correctSequence = [first, previous, '1','2','3','4','5', next, last];

		angular.forEach(paging.find('a'), function(span){
			var _span = angular.element(span);
			sequence.push(_span.text());
		});

		expect(sequence).toEqual(correctSequence);
	});

});
