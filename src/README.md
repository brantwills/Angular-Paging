###Source Files
The source file directory contains a sample working application using all the features of the paging directive.

The goal of this working version is to mitigate simple setup and "how to" questions as well as visually test new features

---
<br/>

####App.js
A simple angular application module which consumes the paging directive and introduces a single controller 

The controller is used to explain how a `paging action` could be introduced into the paging directive

---
<br/>

####Index.html
A simple HTML implementation of the angular application defined in `app.js`

This file should exercise both the simple and advanced options of the paging directive

---
<br/>


####Paging.js

The paging directive code.  This is identical to the source code placed in the distribution file.

The paging directive is contained in a `bw.paging` module which you can consume in your project.


**The following constraints are build into the directive by design:**

`
**Condition: If the page is larger than the pageCount**
Result: the page will be set to the pageCount value
`

`
**Condition: Block where the page is larger than the pageCount
Result: 
`

`
**Condition: Block where the page is less than 0
Result: 
`

`
**Condition: Block where adjacent value is 0 or below
Result: 
`

`
**Condition: Block clicks we try to load the active page
Result: 
`