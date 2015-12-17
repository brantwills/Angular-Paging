/**
 * Contains the custom text and tooltip title tests
 * These tests ensure the text-* and text-title-* attributes are applied correctly
 */
describe('Angular-Paging: Custom Text and Tooltip Title Tests', function() {

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
                'pg-href="{{pgHref}}" ' +
                'show-prev-next="{{showPrevNext}}" ' +
                'show-first-last="{{showFirstLast}}" ' +
                'text-first="{{textFirst}}" ' +
                'text-last="{{textLast}}" ' +
                'text-next="{{textNext}}" ' +
                'text-prev="{{textPrev}}" ' +
                'text-title-page="{{textTitlePage}}" ' +
                'text-title-first="{{textTitleFirst}}" ' +
                'text-title-last="{{textTitleLast}}" ' +
                'text-title-next="{{textTitleNext}}" ' +
                'text-title-prev="{{textTitlePrev}}" ' +
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
        scope.total = 50;
        scope.showPrevNext = true;
        scope.showFirstLast = true;
        recompile();

    }));



    it('Should assign the default text and title tool tip values', function(){

        // Hook in our click action
        var li = paging.find('li');
        var first = li.eq(0);
        var prev = li.eq(1);
        var next = li.eq(li.length - 2);
        var last = li.eq(li.length - 1);

        // Test that our values are equal to the defaul values
        expect(first.text().trim()).toEqual('<<');
        expect(first.attr('title')).toEqual('First Page');

        expect(prev.text().trim()).toEqual('<');
        expect(prev.attr('title')).toEqual('Previous Page');

        expect(next.text().trim()).toEqual('>');
        expect(next.attr('title')).toEqual('Next Page');

        expect(last.text().trim()).toEqual('>>');
        expect(last.attr('title')).toEqual('Last Page');

    });



    it('Should assign the custom text and title tool tip values', function(){

        // Test text variables
        var textFirst = 'Custom First';
        var textLast = 'Custom Last';
        var textNext = 'Custom Next';
        var textPrev = 'Custom Prev';

        // Test title text variables
        var textTitlePage = "Custom Page Title"
        var textTitleFirst = "Custom First Title"
        var textTitleLast = "Custom Last Title"
        var textTitleNext = "Custom Next Title"
        var textTitlePrev = "Custom Prev Title"

        // Baseline our scope
        scope.textFirst = textFirst;
        scope.textLast = textLast;
        scope.textNext = textNext;
        scope.textPrev =textPrev;

        scope.textTitlePage = textTitlePage;
        scope.textTitleFirst = textTitleFirst;
        scope.textTitleLast = textTitleLast;
        scope.textTitleNext =textTitleNext;
        scope.textTitlePrev =textTitlePrev;

        recompile();

        // Hook in our click action
        var li = paging.find('li');
        var page = li.eq(4);
        var first = li.eq(0);
        var prev = li.eq(1);
        var next = li.eq(li.length - 2);
        var last = li.eq(li.length - 1);

        // Test that our values are equal to the defaul values
        expect(first.text().trim()).toEqual(textFirst);
        expect(first.attr('title')).toEqual(textTitleFirst);

        expect(prev.text().trim()).toEqual(textPrev);
        expect(prev.attr('title')).toEqual(textTitlePrev);

        expect(next.text().trim()).toEqual(textNext);
        expect(next.attr('title')).toEqual(textTitleNext);

        expect(last.text().trim()).toEqual(textLast);
        expect(last.attr('title')).toEqual(textTitleLast);

    });



    it('Should replace {page} for the actual page number in title text', function(){


        // Page to test against
        var pageIndex = 4;
        var pageTitleIndex = 3

        // Baseline our scope
        scope.textTitlePage = 'Page {page} and Again {page}';
        recompile();

        // Hook in our click action
        var li = paging.find('li');
        var pageItem = li.eq(pageIndex);

        // Check that our page has been replaced correctly
        expect(pageItem.attr('title')).toEqual('Page ' + pageTitleIndex + ' and Again ' + pageTitleIndex);

    });
    
    
    it('Should replace {page} for the actual page number in anchor link', function(){

        // Page to test against
        var pageIndex = 4;
        var pageTitleIndex = 3

        // Baseline our scope
        scope.pgHref = 'Goto {page} and Again {page}';
        recompile();

        // Hook in our click action
        var li = paging.find('a');
        var pageItem = li.eq(pageIndex);

        // Check that our page has been replaced correctly
        expect(pageItem.attr('href')).toEqual('Goto ' + pageTitleIndex + ' and Again ' + pageTitleIndex);

    });




});
