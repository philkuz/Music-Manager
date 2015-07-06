var nameApp = angular.module('music', ['ngRoute']);

//create hte Album factory
nameApp.factory('Albums', function($http)
{
	return $http.get('api/displaylist.json');
});
// nameApp.factory('getAlbum', ['Albums',function(name)
// {
// 	Albums.success(funciton(data)
// 	{
// 		fo
// 	})
// })
//setup router
nameApp.config(function($routeProvider)
{
	$routeProvider.
		when('/', {
			templateUrl: 'templates/displayAlbums.html', 
			controlller: 'DisplayCtrl'
		}).
		when('/:albumName', {
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
nameApp.controller('AlbumCtrl', ['$scope', '$routeParams', function ($scope, $routeParams)
{
	$scope.albumName = $routeParams.albumName;
}]);
nameApp.controller('DisplayCtrl',['$scope', '$http', 
	function ($scope, $http) {
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