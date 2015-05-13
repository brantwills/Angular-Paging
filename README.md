###Angular Paging
<p>
<b>Demo Available At: http://brantwills.github.io/Angular-Paging/</b>
</p>
An Angular directive to aid paging large datasets requiring minimum paging information.
<br/>
<br/>

####Background
--------------
I have often found myself paging across millions of log rows or massive non-normalized lists even after some level of filtering by date range or on some column value.  These scenarios have pushed me to develop a reusable paging scheme which just happens to drop nicely into AngularJS.
<br/>
<br/>

####Code Samples
-------------
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
  adjacent="{{adjacent}}"
  dots="{{dots}}"
  scroll-top="{{scrollTop}}" 
  hide-if-empty="{{hideIfEmpty}}"
  ul-class="{{ulClass}}"
  active-class="{{activeClass}}"
  disabled-class="{{disabledClass}}"
  show-prev-next="{{showPrevNext}}"
  paging-action="DoCtrlPagingAct('Paging Clicked', page, pageSize, total)">
</paging>   
```
######See [index.html](https://github.com/brantwills/Angular-Paging/blob/master/index.html) for complete code samples and documentation
<br/>

####Programmatic Goals
-------------
I wanted to create an angular directive I could easily reuse and tie back into a controller.  Programmatically I wanted to limit the "paging" information a developer would have to pass into the directive.  There are some optional directive attributes for handling CSS classes and hiding previous and next arrows. The following three attributes are required directive inputs:

1. `page` What page am I currently viewing
2. `pageSize` How many items in the list to display on a page
3. `total` What is the total count of items in my list
<br/>
<br/>

####Visual Goals
--------------
I set out to develop a paging display which would allow the user to quickly move to the next or previous page while still allowing them to move to the first or last page instantly. Visually I selected the common pattern `1 2 ... 7 8 9 ... 100 101` where the count inside the dot ellipsis changes as the pages increase or decrease.
######See [Full Demo](http://brantwills.github.io/Angular-Paging/) for complete samples and documentation
<br/>

####Future Todo / Wishlist
--------------
1. Reduce the overall code size by combining next previous functions
2. Clean up documentation
3. Expand Karma tests
<br/>
<br/>

####License
--------------  
MIT Licensed - with the exception that you star this repo :)
<br/>
<br/>
