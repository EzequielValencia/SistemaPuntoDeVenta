angular.module('SistemaPuntoDeVenta')
.controller('seccionProductos',function($scope,$http){
	
	$scope.productos=[];
	$scope.getProductos = function(){
		$http({
			method:"GET",
			url:url_principal+'/productos/listaProductos'
		}).then(function succesCallback(data){
			$scope.prodcutos = data.data;
			console.log($scope.prodcutos);
		},function errorCallback(e){
			console.log(e);
		});
	}
	$scope.getProductos();
	
});