angular.module("SistemaPuntoDeVenta").
controller('seccionProductos',function($scope,$http){
	$scope.prodcutos=[];
	$scope.productoNuevo={nombre:'',precioCosto:0,precioVenta:0,cantidadMinima:0,porcentajeGanancia:0,existencia:0};
	$scope.productoEliminar={};
	$scope.productoEditar={};
	getListaProductos();
	
	
	$scope.definirClase = function(producto){
		if(producto.existencia == 0){
			return 'bg-danger text-white';
		}
		if(producto.existencia < producto.cantidadMinima){
			return 'bg-warning text-white';
		}
	}
	
	$scope.calcularGanancia = function (producto){
		if(producto.porcentajeGanancia == undefined){
			producto.porcentajeGanancia = 0;
		}
		producto.precioVenta = producto.precioCosto + (producto.precioCosto * (producto.porcentajeGanancia/100));  
	}
	
	
	$scope.getProducto = function(id,producto){
		console.log(url_principal+"productos/producto/"+id);
		$http({
			method:"GET",
			url:url_principal+"productos/producto/"+id
		}).then(function succesCallBack(data){
			if(producto==1){
				$scope.productoEditar = data.data;
			}else{
				$scope.productoEliminar = data.data;
			}
		},function errorCallback(error){
			console.log(e);
		});
	};
	
	$scope.guardarProducto = function(producto,modal){
		$http({
			method:"POST",
			url:url_principal+"productos/guardarProducto/",
			data:JSON.stringify(producto)
		}).then(function succesCallBack(data){
			console.log(data);
			if(data.data){
				$(modal).modal('hide');
				getListaProductos();
				mostrarAlerta('Producto guardado correctamente','succes');
				//producto == $scope.productoNuevo?($scope.productoNuevo= {nombre:'',precioCosto:0,precioVenta:0,cantidadMinima:0,porcentajeGanancia:0,existencia:0}):;
				};
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	$scope.eliminarProducto = function(producto,modal){
		$http({
			method:"POST",
			url:url_principal+"productos/eliminarProducto",
			data:JSON.stringify(producto)
		}).then(function succesCallBack(data){
			console.log(data);
			if(data.data){
				$(modal).modal('hide');
				getListaProductos();
				mostrarAlerta('Producto eliminado','danger');
			}
			
		},function errorCallback(e){
			console.log(e);			
			$(modal).modal('hide');
			mostrarAlerta('El producto no se pudo eliminar.','warning');
			setTimeout(function(){  }, 3000);
			setTimeout(function(){ mostrarAlerta('Es probable que este ligado a una venta.','warning'); }, 3000);			
		});
	}
	
	function getListaProductos(){
		
		$http({
			method:"GET",
			url: url_principal+"productos/listaProductos"
		}).then(function succesCallback(data){
			$scope.productos = data.data;
		
		},function errorCallback (e){
			console.log(e);
		});
	};
	
});