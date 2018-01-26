angular.module("SistemaPuntoDeVenta")
.controller("facturasController",function($scope,$http){
	$scope.facturas=[];
	$scope.facturaAEliminar={};
	getFacturas();
	
	
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
	
	
	$scope.mostrarFiltro = function(){
		var estadoContenedorFiltro = !$("#contenedorFiltro").prop('hidden');
		console.log(estadoContenedorFiltro);
		if(estadoContenedorFiltro){
			$scope.filtro="";
		}
		$("#contenedorFiltro").prop('hidden',estadoContenedorFiltro);
	}
	
	
	function getFacturas(){
		$http({
			method:"GET",
			url:url_principal+"/facturas/listaFacturas"
		}).then(function succesCallback(data){
			$scope.facturas = data.data;
			console.log($scope.facturas);
		},function errorCallback(e){
			console.log(e);
		});
	}	
	
	
});