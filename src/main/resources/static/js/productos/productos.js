angular.module("SistemaPuntoDeVenta").
controller('seccionProductos',function($scope,$http){
	$scope.prodcutos=[];
	$scope.productoNuevo={};
	$scope.productoEliminar={};
	$scope.productoEditar={};
	getListaProductos();
	
	$scope.guardarProducto=function(){
		console.log($scope.productoNuevo.imagen);
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
			}
			
			
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