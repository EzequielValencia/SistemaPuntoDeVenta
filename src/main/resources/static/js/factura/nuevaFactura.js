angular.module('SistemaPuntoDeVenta')
.controller('facturasController',function($scope,$http){
	$scope.facturaNueva = {};
	$scope.fechaSolicitada;
	$scope.codigoProducto='';
	$scope.listaClientes=[];
	$scope.clienteAsociado = 0;
	$scope.total=0;
	getFacturaNueva();

	
	$scope.fijarFechaActual = function(){
		var anio = new Date().getFullYear();
		var mes = new Date().getMonth()+1;
		var dia = new Date().getDate();
		$scope.fechaSolicitada = anio+'-'+mes+'-'+dia;
		$("#selectorFecha").val($scope.fechaSolicitada);
		console.log($scope.fechaSolicitada);
	}
	
	$scope.verificaTeclaPrecionada = function(event){
		if(event.keyCode == 13){
			$scope.buscarProducto();
		}
	}
	
	$scope.evitarRecargarPagina = function(event){
		if(event.keyCode==116){
			event.preventDefault();
			if(confirm("¿Quieres recargar la pagina?.\nTendras que ingresar de nueva cuenta los productos")){
				console.log("Acepto");
				$scope.facturaNueva.itemsFactura.forEach(function(item){
					
					$scope.reestablacerExistencia(item);
				});
				
				location.reload(true);
			}
		}
		
	}
	
	$scope.cancelarVenta = function(){
		$scope.facturaNueva.itemsFactura.forEach(function(item){
			$scope.reestablacerExistencia(item);
		});
		$scope.facturaNueva.itemsFactura=[];
		$scope.calculaTotal();
		mostrarAlerta("Venta cancelada","info");
	}
	
	$scope.sePuedeVender = function(){
		if($scope.total>0){
			$scope.traeListaClientes();
			$("#modalFinalizarVenta").modal('show');
		}else{
			mostrarAlerta("No hay productos para vender","info");
		}
	}
	
	$scope.buscarProducto= function(){
		if($scope.codigoProducto.length==0){
			mostrarAlerta("El campo del codigo esta vacio","warning");
		}else{
			$http({
			  method:"GET",
			  url:url_principal+'productos/productoParaFactura?idProducto='+$scope.codigoProducto
			}).then(function succesCallback(data){
				if(data.data!=""){
					var producto = data.data;
					if(producto.existencia!=0){
						if(producto.existencia < producto.cantidadMinima){
							mostrarAlerta("Tiene menos de la cantidad minina del producto","warning");
						}
						$scope.agregaProductoAFactura(producto);
						$scope.codigoProducto='';
					}else{
						mostrarAlerta("Este producto esta agotado","danger");
					}
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
				$scope.facturaNueva.itemsFactura[i].producto.precioVenta;	
			}
		}
	
	$scope.finalizarVenta = function(){
		$scope.facturaNueva.total = $scope.total; 
		$http({
			method:"POST",
			url:url_principal+"/facturas/guardarFactura/"+$scope.clienteAsociado,
			data:JSON.stringify($scope.facturaNueva)
		}).then(function succesCallback (data){
			if(data.data){
				mostrarAlerta("Factura creada con exito" ,"success");
				getFacturaNueva();
				$scope.total=0;
			}
		},function errorCallback (e){
			mostrarAlerta("Hubo problemas al crear la factura" ,"danger");
		});
		
	}
	
	$scope.quitarProducto = function(idProducto){
		var cantidadProductosEnFactura=$scope.facturaNueva.itemsFactura.length;
		for(var i=0;i<cantidadProductosEnFactura;i++){
				if($scope.facturaNueva.itemsFactura[i].producto.id==idProducto){
					$scope.facturaNueva.itemsFactura.splice(i,1);
					break;
				}
			}
		$scope.calculaTotal();
	}
	
	$scope.reestablacerExistencia = function(item){
		$http({
			method:"POST",
			url:url_principal+"productos/reestablercerExistenciaProducto?cantidadAReestablecer="+item.cantidad+"&idProducto="+item.producto.id
		}).then(function succesCallBack(data){
			
		},function errorCallBack(e){
			console.log(e);
		})
	};
	
	
	$scope.traeListaClientes = function(){
		$http({
			  method:"GET",
			  url:url_principal+'/clientes/listaClientes'
			}).then(function succesCallback(data){
				$scope.listaClientes=data.data;
				console.log($scope.listaClientes);
			},function errorCallback(e){
				console.log(e);
			});
	}
	
	$scope.darCambio = function(){
		if($scope.facturaNueva.pagoCon==0 || $scope.facturaNueva.pagoCon==undefined){
			return 0;
		}
		return $scope.facturaNueva.pagoCon - $scope.total;
	}
	
	$scope.listadoDeVentas = function(){
		console.log(url_principal+"facturas/listaFacturasPorFecha?fechaSolicitada="+$scope.fechaSolicitada);
		$http({
			method:"GET",
			url:url_principal+"facturas/listaFacturasPorFecha?fechaSolicitada="+$scope.fechaSolicitada
		}).then(function succesCallback(data){
			$scope.facturas = data.data;
			console.log($scope.facturas);
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	$scope.detalleFactura=function(facturaSolicitada){
		console.log(url_principal+'facturas/detallesFactura?idFactura='+facturaSolicitada);
		$http({
			method:'GET',
			url:url_principal+'facturas/detallesFactura?idFactura='+facturaSolicitada
		}).then(function succesCallback(data){
			$("#contenedorDetalleFactura").empty();
			$("#contenedorDetalleFactura").addClass("bg-inverse");
			$("#contenedorDetalleFactura").append(data.data);
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	function getFacturaNueva(){
		$http({
		  method:"GET",
		  url:url_principal+'/facturas/nuevaFactura'
		}).then(function succesCallback(data){
			$scope.facturaNueva=data.data;
			console.log($scope.facturaNueva);
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	$scope.fechaSeleccionada = function(){
		$scope.fechaSolicitada = $("#selectorFecha").val();
		$scope.listadoDeVentas();
	}

});