/**
 * Contains Jasmine tests for the Angular-Paging directive
 */
describe('angular-paging', function() {

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
                'scroll-top="{{scrollTop}}"  ' +
                'hide-if-empty="{{hideIfEmpty}}" ' +
                'ul-class="{{ulClass}}" ' +
                'active-class="{{activeClass}}" ' +
                'disabled-class="{{disabledClass}}" ' +
                'show-prev-next="{{showPrevNext}}" ' +
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
        scope.total = 1000;
        scope.adjacent = 3;
        scope.dots = '...';
        scope.scrollTop = false;
        scope.hideIfEmpty = true;
        scope.ulClass = 'pagination';
        scope.activeClass = 'active';
        scope.disabledClass = 'disabled';
        scope.showPrevNext = false;
        recompile();

    }));


    /**
     * Contains the basic show and hide tests
     * These tests ensure the structure of the paging directive is achieved
     */
    describe('basic display and setup tests', function() {

        it('should generate a single un-ordered list', function() {
            expect(paging.find('ul').length).toEqual(1);
        });

        it('should generate generate list items', function() {
            var count = 0;
            angular.forEach(paging.find('li'), function(item){
                count++;
            });
            expect(count).toBeGreaterThan(0);
        });

        it('should generate a single span within each list item', function() {
            angular.forEach(paging.find('li'), function(item){
                var _item = angular.element(item);
                expect(_item.find('span').length).toBe(1);
            });
        });

    });


    /**
     * Contains the basic class name tests
     * These tests validate each class name has been correctly applied
     */
    describe('basic css class name tests', function() {


        it('should append the ul class to the un-ordered list', function(){
            var ul = paging.find('ul').eq(0);
            expect(ul.hasClass(scope.ulClass)).toEqual(true);
        }); 


        it('should append the active class to the single corresponding active page list item', function(){

            // Baseline scope by Randomize which page is active
            scope.currentPage = Math.floor(Math.random() * 100) + 1;
            scope.pageSize = 10;
            scope.total = 1000;
            recompile();

            var count = 0;
            var spanText = 'unknown';
            var hasActiveClass = false;

            angular.forEach(paging.find('li'), function(item){
                var _item = angular.element(item);
                if(_item.hasClass(scope.activeClass)){
                  count++;
                  hasActiveClass = true;

                  var span = _item.find('span').eq(0);
                  spanText = parseInt(span.text(), 10);
                }
            });

            expect(count).toEqual(1);
            expect(hasActiveClass).toBe(true);
            expect(spanText).toEqual(scope.currentPage);

        }); 


        it('should append the disabled class to the previous items in the list', function(){

            // Baseline scope
            scope.currentPage = 1;
            scope.pageSize = 10;
            scope.total = 1000;
            scope.showPrevNext = true;
            scope.disabledClass = 'disabled';
            recompile();

            // Check first two items in list for disabled
            var items = paging.find('li');
            expect(items.eq(0).hasClass(scope.disabledClass)).toEqual(true);
            expect(items.eq(1).hasClass(scope.disabledClass)).toEqual(true);

        });


        it('should append the disabled class to the next items in the list', function(){

            // Adjust current page to the end of the list
            scope.currentPage = 100;
            scope.pageSize = 10;
            scope.total = 1000;
            scope.showPrevNext = true;
            scope.disabledClass = 'disabled';
            recompile();

            // Check the last two items in list for disabled
            var items = paging.find('li');
            var count = items.length;
            expect(items.eq(count - 1).hasClass(scope.disabledClass)).toEqual(true);
            expect(items.eq(count - 2).hasClass(scope.disabledClass)).toEqual(true);

        });

    });


    
    /**
    * Contains the number and symbol formatting tests
    * These tests ensure the paging layout is correct for the specific paging cases we handle
    * Includes things like first and last arrows and dot displays
    */
    describe('number and symbol formatting tests', function(){

        it('should correctly display the beginning page items', function(){

            // Baseline our scope
            scope.currentPage = 1;
            scope.pageSize = 10;
            scope.total = 1000;
            scope.adjacent = 2;
            scope.dots = '...';
            scope.showPrevNext = false;
            recompile();

            // Setup and perform test
            var sequence = [];
            var correctSequence = ['1','2','3','4','5','6','7','...','99','100'];

            angular.forEach(paging.find('span'), function(span){
                var _span = angular.element(span);
                sequence.push(_span.text());
            });

            expect(sequence).toEqual(correctSequence);

        });



        it('should correctly display the middle page items', function(){

            // Baseline our scope
            scope.currentPage = 50;
            scope.pageSize = 10;
            scope.total = 1000;
            scope.adjacent = 2;
            scope.dots = '...';
            scope.showPrevNext = false;
            recompile();

            // Setup and perform test
            var sequence = [];
            var correctSequence = ['1','2','...','48','49','50','51','52','...','99','100'];

            angular.forEach(paging.find('span'), function(span){
                var _span = angular.element(span);
                sequence.push(_span.text());
            });

            expect(sequence).toEqual(correctSequence);

        });


        it('should correctly display the ending page items', function(){

            // Baseline our scope
            scope.currentPage = 100;
            scope.pageSize = 10;
            scope.total = 1000;
            scope.adjacent = 2;
            scope.dots = '...';
            scope.showPrevNext = false;
            recompile();

            // Setup and perform test
            var sequence = [];
            var correctSequence = ['1','2','...','94','95','96','97','98','99','100'];

            angular.forEach(paging.find('span'), function(span){
                var _span = angular.element(span);
                sequence.push(_span.text());
            });

            expect(sequence).toEqual(correctSequence);

        });


        it('should correctly display the small set of page items without dots', function(){

            // Baseline our scope
            scope.currentPage = 1;
            scope.pageSize = 10;
            scope.total = 50;
            scope.adjacent = 2;
            scope.showPrevNext = false;
            recompile();

            // Setup and perform test
            var sequence = [];
            var correctSequence = ['1','2','3','4','5'];

            angular.forEach(paging.find('span'), function(span){
                var _span = angular.element(span);
                sequence.push(_span.text());
            });

            expect(sequence).toEqual(correctSequence);

        });

        it('should never display a number twice or a number out of range for the beginning', function(){
            
            // Baseline our scope
            scope.currentPage = 1;
            scope.pageSize = 1;
            scope.total = 100;
            scope.adjacent = 2;
            recompile();  
              
            for(var size = 1; size <= 100; size++){
              
                var sequence = [];  
                scope.pageSize = size;
                var pageCount = Math.ceil(scope.total / scope.pageSize);
                scope.$digest();    
                 
                angular.forEach(paging.find('span'), function(span){
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


        it('should never display a number twice or a number out of range in the middle', function(){
            
            // Baseline our scope
            scope.currentPage = 50;
            scope.pageSize = 1;
            scope.total = 100;
            scope.adjacent = 2;
            recompile();  
              
            for(var size = 1; size <= 100; size++){
              
                var sequence = [];
                scope.pageSize = size;
                scope.currentPage = Math.ceil((scope.total / scope.pageSize) / 2);
                var pageCount = Math.ceil(scope.total / scope.pageSize);
                scope.$digest();    
                
                angular.forEach(paging.find('span'), function(span){
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
        

        it('should never display a number twice or a number out of range at the end', function(){
            
            // Baseline our scope
            scope.currentPage = 100;
            scope.pageSize = 1;
            scope.total = 100;
            scope.adjacent = 2;
            recompile();  
              
            for(var size = 1; size <= 1000; size++){
              
                var sequence = [];  
                scope.pageSize = size;
                scope.currentPage = 100;
                var pageCount = Math.ceil(scope.total / scope.pageSize);
                scope.$digest();    
                
                angular.forEach(paging.find('span'), function(span){
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


        it('should display next and previous arrows correctly', function(){

            // Baseline our scope
            scope.currentPage = 1;
            scope.pageSize = 10;
            scope.total = 50;
            scope.adjacent = 2;
            scope.showPrevNext = true;
            recompile();

            // Setup and perform test
            var sequence = [];
            var correctSequence = [first, previous, '1','2','3','4','5', next, last];

            angular.forEach(paging.find('span'), function(span){
                var _span = angular.element(span);
                sequence.push(_span.text());
            });

            expect(sequence).toEqual(correctSequence);
        });


    });
  


    
    /**
    * Contains the click tests
    * These tests trigger the click event of the paging items
    */
    describe('click tests', function(){

        it('should detect the paging action for valid list items', function(){

            // where pageToClick != 1 as page 1 is the current page
            var pageToClick = 3;

            // Baseline our scope
            scope.currentPage = 1;
            scope.pageSize = 10;
            scope.total = 50;
            recompile();

            // Ensure inner scope params are falsy to begin
            expect(scope.paramPage).toBeFalsy();
            expect(scope.paramPageSize).toBeFalsy();
            expect(scope.paramTotal).toBeFalsy();

            // Hook in our click action
            var item = paging.find('li').eq(pageToClick - 1);
            item.triggerHandler('click');

            // Test that inner scope params have been updated
            expect(scope.paramPage).toEqual(pageToClick);
            expect(scope.paramPageSize).toEqual(scope.pageSize);
            expect(scope.paramTotal).toEqual(scope.total);
        });



        it('should move to the first page when << is clicked', function(){

            // Set up the mock page 
            var page = 3;

            // Baseline our scope
            scope.currentPage = page;
            scope.pageSize = 10;
            scope.total = 50;
            scope.showPrevNext = true;
            recompile();

            // Ensure current page is set 
            expect(scope.currentPage).toBe(page);

            // Hook in our click action
            var item = paging.find('li').eq(0);
            item.triggerHandler('click');

            // Test that current page has been updated 
            expect(scope.currentPage).toBe(1);

        });


        it('should move to the previous page when < is clicked', function(){

            // Set up the mock page 
            // In this test we expect page to be > 1
            var page = 3;

            // Baseline our scope
            scope.currentPage = page;
            scope.pageSize = 10;
            scope.total = 50;
            scope.showPrevNext = true;
            recompile();

            // Ensure current page is set to 
            expect(scope.currentPage).toBe(page);

            // Hook in our click action
            var item = paging.find('li').eq(1);
            item.triggerHandler('click');

            // Test that current page has been updated 
            expect(scope.currentPage).toBe(page - 1);

        });

        it('should move to the last page when >> is clicked', function(){

            // Set up the mock page 
            var page = 1;

            // Baseline our scope
            scope.currentPage = page;
            scope.pageSize = 10;
            scope.total = 50;
            scope.showPrevNext = true;
            recompile();

            // Ensure current page is set 
            expect(scope.currentPage).toBe(page);

            // Hook in our click action
            var items = paging.find('li');
            var count = items.length;
            var item = items.eq(count - 1);
            item.triggerHandler('click');

            // Test that current page has been updated 
            // We hard code in 5 as we know there will only be 5 pages
            expect(scope.currentPage).toBe(5);

        });


        it('should move to the next page when > is clicked', function(){

            // Set up the mock page 
            // In this test we expect page to be > 1
            var page = 3;

            // Baseline our scope
            scope.currentPage = page;
            scope.pageSize = 10;
            scope.total = 50;
            scope.showPrevNext = true;
            recompile();

            // Ensure current page is set
            expect(scope.currentPage).toBe(page);

            // Hook in our click action
            var items = paging.find('li');
            var count = items.length;
            var item = items.eq(count - 2);
            item.triggerHandler('click');

            // Test that current page has been updated 
            // We hard code in 5 as we know there will only be 5 pages
            expect(scope.currentPage).toBe(page + 1);

        });

    });

});
