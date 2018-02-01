//var useragent = navigator.userAgent||navigator.vendor||window.opera;
//Creamos una variable para detectar los móviles
//var ismobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|zh-cn|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(useragent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(useragent.substr(0,4));

//Los buscamos
//if(ismobile){alert("Dispositivo Móvil Detectado");}

//También podemos detectar si es móvil u ordenador usando else
//if(ismobile){alert("¡Estás usando un dispositivo móvil!");} else {alert("No estás usando un dispositivo móvil.");}
angular.module('SistemaPuntoDeVenta')
.controller('facturasController',function($scope,$http){
	$scope.facturaNueva = {};
	$scope.fechaSolicitada;
	$scope.facturaAEliminar = {};
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
		$http({
			method:"GET",
			url:url_principal+"facturas/listaFacturas"
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
		$scope.listadoDeVentasPorFecha();
	}

	$scope.listadoDeVentasPorFecha = function(){
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
				$scope.detalleFactura(factura.id);
				if($scope.fechaSolicitada=='' || $scope.fechaSolicitada==undefined ){					
					$scope.listadoDeVentas();
				}else{
					$scope.listadoDeVentasPorFecha();
				}
				mostrarAlerta("Factura eliminada correctamente","danger");
			}
		},function errorCallback(e){
			mostrarAlerta('Ocurio un error al querer eliminar la factura','succes');
		});
	}
});

$('#modalVentasDelDia').on('hidden.bs.modal', function (e) {
	$("#contenedorDetalleFactura").empty();
	$("#contenedorDetalleFactura").removeClass("bg-inverse");
});