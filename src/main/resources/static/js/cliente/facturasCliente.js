angular.module("SistemaPuntoDeVenta")
.controller('seccionFacturasCliente',function($scope,$http){
	console.log("Facturas del cliente");
	$scope.cliente={};
	$scope.facturaAEliminar={};
	getCliente();
	console.log(window.location.href+'/facturas');
	
	$scope.verDetalleFactura = function(idFactura){
		window.location.href = url_principal+'facturas/detallesFactura?idFactura='+idFactura;
	}
	
	$scope.getFactura = function (idFactura){
		$http({
			method:"GET",
			url:url_principal+'facturas/factura?idFactura='+idFactura
		}).then(function succesCallback(data){
			$scope.facturaAEliminar = data.data;
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	$scope.eliminarFactura = function(factura){
		$http({
			method:"POST",
			url:url_principal+'facturas/eliminarFactura',
			data:JSON.stringify(factura)
		}).then(function succesCallback(data){
			if(data.data){
				$("#modalEliminarFactura").modal('hide');
				mostrarAlerta("Factura eliminada correctamente","danger");
				getCliente();
			}
		},function errorCallback(e){
			mostrarAlerta('Ocurio un error al querer eliminar la factura','succes');
		});
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