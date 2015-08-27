####Test Files

This folder contains all the necessary test files for those interested in contributing to the paging directive

This directive relies on **[node package manager](https://www.npmjs.com/)** to perform the **[karma test runner](http://karma-runner.github.io/)** which executes the  **[jasmine tests](http://jasmine.github.io/)** which are found in the `spec.js` files. 

---
<br/>

####How to test the directive

The quickest way to start testing is to perform the following **[node package manager](https://www.npmjs.com/)** console commands 

`npm install`

`npm test`

This will kick off the karma test suite and instantly perform the tests

The karma environment is driven by the `karma.config.js` file

---
<br/>

####Customizing Tests 

Feel free to modify the karma.config.js file as you see fit

The published `karma.config.js` is built with the following considerations in mind:

- Leverages **[phantomJs](http://phantomjs.org/)** with help from the **[phantomJs karma launcher](https://www.npmjs.com/package/karma-phantomjs-launcher)** as the browser of choice

- Leverages local angular and angular mock source files from the node_modules folder which are created on `npm install`

- Set for single runs to aid continuous integrators like **[travis-ci](https://travis-ci.org/brantwills/Angular-Paging)**







