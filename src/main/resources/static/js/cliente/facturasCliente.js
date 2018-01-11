angular.module("SistemaPuntoDeVenta")
.controller('seccionFacturasCliente',function($scope,$http){
	console.log("Facturas del cliente");
	$scope.cliente={};
	getCliente();
	
	
	function getCliente(){
		$http({
			method:'GET',
			url:window.location.href+'/facturas'
		}).then(function succesCallbak(data){
			console.log(data.data);
			$scope.cliente = data.data;
		},function errorCallback(e){
			console.log(e);
		});
	}
});