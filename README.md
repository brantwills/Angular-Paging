ngPaging
========

A directive to aid in paging large datasets 
while requiring the bare minimum of actual paging
information.


Background

I found myself constantly paging across millions 
of rows even after I've performed some level of 
database filtering (say by date range or name).  I'm not
boasting that my data is better than yours, actually
it's quite the contrary, often I am forced into positions with
insanely generated tables where normalization was not 
considered, or to be fair, the input into the database
itself is just garbage or very "log based".

Goal

I wanted to develop a paging display which pulls away
from the typical < << first 1 2 3 4 [drop-down] last >> >.  In my 
experience users never really have a true need to zip to the
9th page 2nd result and if they do they have probably bookmarked
the actual URL or more directly they have found the item of interest
through filters.

I found the the best representation was allowing the user
to quickly move next or previous as this meets the immediate need
for paging, while still allowing them to 
get out of jail freely (move to the first or last page). 
So visually I selected the common pattern 1 2 ... 7 8 9 ... 100 101  


Known Issues

Increasing the adjacent values beyond '2' screws things up