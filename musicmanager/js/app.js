var nameApp = angular.module('music', ['ngRoute']);
nameApp.filter('split', function(){
	return function(input, splitChar, splitIndex){
		return inputs.split(splitChar)[splitIndex];
	}
});
//create hte Album factory
nameApp.factory('Albums', function($http)
{
	return $http.get('api/displaylist.json').success(function(data)
	{
		return data;
	});
});

//setup router
nameApp.config(function($routeProvider)
{
	$routeProvider.
		when('/', {
			templateUrl: 'templates/displayAlbums.html', 
			controlller: 'DisplayCtrl'
		}).
		when('/:albumID', {
			templateUrl: 'templates/singleAlbums.html', 
			controller: 'AlbumCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});
//setup controllers
nameApp.controller('BodyCtrl', ['$scope', function($scope)
{
	$scope.title="Music Manager";
	$scope.links= [
		{"name": "Home","url":"/", "active": true},
		{"name": "Search", "url":"/", "active": false},
		{"name": "About", "url":"/", "active": false}
	];
}]);
nameApp.controller('AlbumCtrl', ['$scope', '$routeParams', 'Albums',
 function ($scope, $routeParams, Albums){
 	var query = $routeParams.albumID;
 	$scope.query = query;
 	var albums = Albums;
	$scope.albums = albums;
	$scope.album = function(){
		for(i = 0;  i < albums.length; i++){
			var object = albums[i];
			if(object['albumID'] === query){
				return object;
			}
		}
		return null;
	};
	$scope.albumExists = function(){
		
		if($scope.album === null)
			return false;
		else
			return true;
	};
	

}]);
nameApp.controller('DisplayCtrl',['$scope', '$http', 
	function ($scope, $http) {
		$scope.albums = 
		$http.get('api/displaylist.json').success(function(data){
			$scope.albums = data;
		});
		$scope.def = 'nein';
	}]);
//setup directives

nameApp.directive('backImg', function(){
	return function(scope, element, attrs){
		var url = attrs.backImg;
		element.css({
			'background-image': 'url(' + url +')',
			'bacground-size' : 'contain'
		});
	};
});