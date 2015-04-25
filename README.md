###Angular Paging
--------------
An Angular directive to aid paging large datasets requiring minimum paging information.

<b>Demo Available At: http://brantwills.github.io/Angular-Paging/</b>



####Background
--------------
I have often found myself paging across millions of log rows or massive non-normalized lists even after some level of filtering by date range or on some column name.  These limits have pushed me to develop a reusable paging scheme which just happens to drop nicely into AngularJS.
<br/>


####Programmatic Goals
-------------
I wanted to create an angular directive I could easily reuse and tie back into a controller.  Programmatically I wanted to limit the "paging" information a developer would have to pass into the directive.  There are some directive attributes for handling CSS classes and items like previous and next arrows. I settled on the following three required directive inputs:

1. `page` What page am I currently viewing
2. `pageSize` How many items in the list to display on a page
3. `total` What is the total count of items in my list


####Visual Goals
--------------
I set out to develop a paging display which would allow the user to quickly move to the next or previous page while still allowing them to move to the first or last page instantly. Visually I selected the common pattern `1 2 ... 7 8 9 ... 100 101` where the count inside the dot ellipsis changes as the pages increase or decrease.


####Future Todo / Wishlist
--------------
1. Reduce the overall code size by combining next previous functions
2. Clean up documentation


####License
--------------  
MIT Licensed - with the exception that you star this repo :)


