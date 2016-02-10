# Angular Paging
[![npm version](https://img.shields.io/npm/v/angular-paging.svg)](https://www.npmjs.org/package/angular-paging)
[![bower version](https://img.shields.io/bower/v/angular-paging.svg)](https://www.npmjs.org/package/angular-paging)
[![Build Status](https://travis-ci.org/brantwills/Angular-Paging.svg)](https://travis-ci.org/brantwills/Angular-Paging)
[![CDN](https://img.shields.io/badge/cdn-rawgit-brightgreen.svg)](https://rawgit.com/brantwills/Angular-Paging/master/dist/paging.min.js) 


**Demo Available At: [http://brantwills.github.io/Angular-Paging/](http://brantwills.github.io/Angular-Paging/)**


An Angular directive to aid paging large datasets requiring minimum paging information.  This paging directive is unique in that we are only interested in the active page of items rather than holding the entire list of items in memory.  This forces any filtering or sorting to be performed outside the directive.

<br/>

## Background
I have often found myself paging across millions of log rows or massive non-normalized lists even after 
some level of filtering by date range or on some column value.  These scenarios have pushed me to develop a reusable paging scheme which just happens to drop nicely into AngularJS.

<br/>

## Installation and Contribution
The core of this project is a simple angular directive which allows you to use the code in many different ways.  If you are interested in keeping current with bug fixes and features, we support both bower and npm install commands.  If you just want to grab the latest or work with CDN's, head over to the distribution folder for the latest code base.  Finally, if you are interested in contributing or see any issues feel free to fork and test away!

<br/>

## Code Samples
[![alt text](https://raw.githubusercontent.com/brantwills/Angular-Paging/gh-pages/basicSample.png "Basic Sample")](http://brantwills.github.io/Angular-Paging/)
```html
<!-- Simple Example -->
<div paging
  page="35" 
  page-size="10" 
  total="1000"
  paging-action="foo('bar', page)">
</div> 
```
[![alt text](https://raw.githubusercontent.com/brantwills/Angular-Paging/gh-pages/advancedSample.png "Basic Sample")](http://brantwills.github.io/Angular-Paging/)
```html
<!-- Advanced Example -->
<paging
  class="small"
  page="currentPage" 
  page-size="pageSize" 
  total="total"
  pg-href="#GotoPage-{page}"
  adjacent="{{adjacent}}"
  dots="{{dots}}"
  scroll-top="{{scrollTop}}" 
  hide-if-empty="{{hideIfEmpty}}"
  ul-class="{{ulClass}}"
  active-class="{{activeClass}}"
  disabled-class="{{disabledClass}}"
  show-prev-next="{{showPrevNext}}"
  show-first-last="{{showFirstLast}}"
  text-first="&laquo;"
  text-last="&raquo;"
  text-next="&rsaquo;"
  text-prev="&lsaquo;"
  text-title-page="Page {page} hover title text"
  text-title-first="First Page hover title text"
  text-title-last="Last Page hover title text"
  text-title-next="Next Page hover title text"
  text-title-prev="Previous hover Page title text"  
  text-first-class="glyphicon glyphicon-backward"
  text-last-class="glyphicon glyphicon-forward" 
  text-next-class="glyphicon glyphicon-chevron-right"
  text-prev-class="glyphicon glyphicon-chevron-left"
  paging-action="DoCtrlPagingAct('Paging Clicked', page, pageSize, total)">
</paging>   
```
**See [src/index.html](https://github.com/brantwills/Angular-Paging/blob/master/src/index.html) for complete code samples and documentation**

<br/>

## Programmatic Goals
I wanted to create an angular directive I could easily reuse and tie back into a controller.  Programmatically I wanted to limit the "paging" information a developer would have to pass into the directive.  There are some optional directive attributes for handling CSS classes and hiding previous and next arrows.  The following three attributes are required directive inputs:

1. `page` What page am I currently viewing
2. `pageSize` How many items in the list to display on a page
3. `total` What is the total count of items in my list

<br/>

## Visual Goals
I set out to develop a paging display which would allow the user to quickly move to the next or previous page while still allowing them to move to the first or last page instantly. Visually I selected the common pattern `1 2 ... 7 8 9 ... 100 101` where the count inside the dot ellipsis changes as the pages increase or decrease.

**See [Full Demo](http://brantwills.github.io/Angular-Paging/) for complete samples and documentation**


