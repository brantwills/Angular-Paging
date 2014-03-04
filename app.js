/**
* @ngDoc module
* @name ng.module:myApp
* 
* @description
* This module is here for sample purposes
*/
var app = angular.module('myApp', []);



/**
* @ngDoc controller
* @name ng.module:myApp
* 
* @description
* This controller is here for sample purposes
*/
app.controller('sampleCtrl',['$scope', function($scope){

	// A function to do some act on paging click
	// In reality this could be calling a service which 
	// returns the items of interest from the server
	// based on the page parameter
	$scope.DoCtrlPagingAct = function(text, page){
		console.log(text, page);
	};

}]);