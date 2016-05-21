/**
 * Contains the disable tests
 * These tests ensure the disabled attribute of the paging directive is achieved
 */
describe('Angular-Paging: Disabled tests', function() {

    // Global Variable Declaration
    var scope, paging, compile;

    // Assign disabled class name
    var disabledClassName = 'disabledClassName';


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
                'pg-href="{{pgHref}}" ' +
                'disabled="{{isDisabled}}"' +
                'disabled-class="{{disabledClass}}"' +
                'paging-action="KarmTestAction(page, pageSize, total)"> ' +
            '</div>';

        // Force our test click action for all recompiles
        scope.KarmTestAction = function(page, pageSize, total){
            scope.wasClicked = true;
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
        scope.isDisabled = false;
        scope.disabledClass= disabledClassName;
        recompile();

    }));



	it('Should set the class to disable for all items in our list', function() {

        // Set disabled to true
        scope.isDisabled = true;
        recompile();

        // Counting variabled
        var disabledCount = 0;
        var liCount = paging.find('li').length;

        // Collect disabled item count
        angular.forEach(paging.find('li'), function(item){
            var _item = angular.element(item);
            var hasDisabledClass = _item.hasClass(scope.disabledClass)
            if(hasDisabledClass){
                disabledCount++;
            }
        });

        expect(liCount).toEqual(disabledCount);

	});




	it('Should not fire onClick on any items in our list', function() {

        // Set disabled to true
        scope.isDisabled = true;
        scope.wasClicked = false;
        recompile();

        // click each item
        angular.forEach(paging.find('a'), function(item){
            var _item = angular.element(item);
            _item.triggerHandler('click'); 
        });

        expect(scope.wasClicked).toBeFalsy();

	});




    it('Should not add an href to any link items in our list', function() {

        // Set disabled to true
        scope.isDisabled = true;
        scope.pgHref = "testing";
        recompile();

        // Counting variabled
        var hrefCount = 0;

        // Collect disabled item count
        angular.forEach(paging.find('a'), function(item){
            var _item = angular.element(item);
            if(_item.attr('href')){
                hrefCount++;
            }
        });

        expect(hrefCount).toEqual(0);
    });


});
