angular.module("SistemaPuntoDeVenta")
.controller('seccionFacturasCliente',function($scope,$http){
	console.log("Facturas del cliente");
	$scope.cliente={};
	getCliente();
	console.log(window.location.href+'/facturas');
	
	function getCliente(){
		$http({
			method:'GET',
			url:window.location.href+'/facturas'
		}).then(function succesCallbak(data){
			$scope.cliente = data.data;
			console.log($scope.cliente);
		},function errorCallback(e){
			console.log(e);
		});
	}
});