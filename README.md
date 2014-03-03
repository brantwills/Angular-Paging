###ngPaging
--------------
A directive to aid in paging large datasets while requiring the bare minimum of actual paging information.


<br/>

####Background
--------------
I often find myself paging across millions of rows even after I'd allowed users some level of database filtering (say by date range or name).  I also find myself forced into positions with large tables where normalization was not considered, or to be fair, the input into the database itself is just garbage or very "log based".  These two limitations have pushed me to develop a reusable paging scheme which just happens to drop nicely into angular.js

<br/>

####Programatic Goals
-------------
I wanted to create an angular directive I could easily reuse and tie back into some form of controller.  I wanted to include as little "paging" information as possible.  Although there are some attributes for handling CSS classes the I settled on the required input being:

1. What page am I currently viewing
2. How many items in the list to display on a page
3. What is the total count of items in my list

<br/>



####Visual Goals
--------------
I wanted to develop a paging display which pulls away from the typical < << first 1 2 3 4 [drop-down] last >> >.  In my 
experience users never really have a true need to zip to the 9th page 2nd result and if they do they have probably bookmarked the actual URL or more directly they have found the item of interest through filters.

I found the the best representation was allowing the user to quickly move next or previous as this meets the immediate need for paging, while still allowing them toget out of jail freely (move to the first or last page). 
So visually I selected the common pattern 1 2 ... 7 8 9 ... 100 101  

<br/>

####Known Issues
--------------
1. Increasing the adjacent values beyond '2' screws things up
2. Would be nice to pass in a function to the directive on page item click
3. The repository name should probably not have 'ng' as in ngPaging

<br/>
