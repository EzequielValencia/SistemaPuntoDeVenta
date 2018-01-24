angular.module("SistemaPuntoDeVenta")
.controller('seccionFacturasCliente',function($scope,$http){
	console.log("Facturas del cliente");
	$scope.cliente={};
	getCliente();
	console.log(window.location.href+'/facturas');
	
	$scope.verDetalleFactura = function(idFactura,idCliente){
		window.location.href = url_principal+'facturas/detallesFactura?idFactura='+idFactura;
	}
	
	
	function getCliente(){
		$http({
			method:'GET',
			url:window.location.href+'/facturas'
		}).then(function succesCallbak(data){
			$scope.cliente = data.data;
		},function errorCallback(e){
			console.log(e);
		});
	}
});