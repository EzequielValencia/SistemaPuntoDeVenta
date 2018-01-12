angular.module('SistemaPuntoDeVenta')
.controller('facturasController',function($scope,$http){
	console.log("Nueva factura");
	$scope.facturaNueva = {};
	$scope.clienteAsociado={};
	$scope.codigoProducto='';
	$scope.total=0;
	getFacturaNueva();
	getClienteAsociado();
	
	
	$scope.verificaTeclaPrecionada = function(event){
		if(event.keyCode == 13){
			$scope.buscarProducto();
		}
	}
	
	
	
	
	$scope.buscarProducto= function(){
		if($scope.codigoProducto.length==0){
			mostrarAlerta("El campo del codigo esta vacio","warning");
		}else{
			$http({
			  method:"GET",
			  url:url_principal+'productos/producto/'+$scope.codigoProducto
			}).then(function succesCallback(data){
				if(data.data!=""){
					var producto = data.data;
					$scope.agregaProductoAFactura(producto);
					$scope.codigoProducto='';
				}else{
					mostrarAlerta("El producto no existe." +
							"Verifica el codigo y vuelve a intentar","danger");
				}
			},function errorCallback(e){
				console.log(e);
			});
		}
	}	
	
	$scope.agregaProductoAFactura = function(producto){
		var cantidadProductosEnFactura=$scope.facturaNueva.itemsFactura.length; 
		if(cantidadProductosEnFactura!=0){
			for(var i=0;i<cantidadProductosEnFactura;i++){
				if($scope.facturaNueva.itemsFactura[i].producto.id == producto.id){
					$scope.facturaNueva.itemsFactura[i].cantidad+=1;	
					$scope.calculaTotal();
					return;
				}
			}
			$scope.facturaNueva.itemsFactura.push({cantidad:1,producto:producto});
			$scope.calculaTotal();
		}else{
			$scope.facturaNueva.itemsFactura.push({cantidad:1,producto:producto});
			$scope.calculaTotal();
		}
		
	}
	
	$scope.calculaTotal = function(){
		$scope.total=0;
		var cantidadProductosEnFactura=$scope.facturaNueva.itemsFactura.length;
		for(var i=0;i<cantidadProductosEnFactura;i++){
				$scope.total += $scope.facturaNueva.itemsFactura[i].cantidad * 
				$scope.facturaNueva.itemsFactura[i].producto.precio;	
			}
		}
	
	
	
	function getFacturaNueva(){
		$http({
		  method:"GET",
		  url:url_principal+'/facturas/nuevaFactura'
		}).then(function succesCallback(data){
			$scope.facturaNueva=data.data;
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	function getClienteAsociado(){
	      var prmstr = window.location.search.substr(1);
	      var idCliente = prmstr.substring(prmstr.indexOf('=')+1);
	      //console.log(prmstr.substring(prmstr.indexOf('=')+1));
	      
		$http({
		  method:"GET",
		  url:url_principal+'/clientes/buscarCliente/'+idCliente
		}).then(function succesCallback(data){
			$scope.clienteAsociado=data.data;
		},function errorCallback(e){
			console.log(e);
		});
	}
});