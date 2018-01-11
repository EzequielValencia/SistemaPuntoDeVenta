angular.module("SistemaPuntoDeVenta")
.controller("seccionClientes",function($scope,$http){
	var paginaActual=0;
	$scope.clientes;
	$scope.botonesPaginado=[];
	getClientes();

	$scope.eliminarCliente = function(idClienteEliminar){
		console.log("Eliminar cliente "+idClienteEliminar);
		$http({
		    method: 'GET', 
		    url: url_principal+"clientes/buscarCliente/"+idClienteEliminar
		}).then(function successCallback(data) {
			
			$scope.clienteEliminar = data.data;
			//$('#modalELiminarCliente').modal('show');
			
		},function errorCallback(e){
			console.log(e);
		});
		$scope.idClienteAEliminar= idClienteEliminar;
	}
	
	$scope.editarCliente=function(idClienteEditar){
		console.log("Editar cliente ");
		$http({
		    method: 'GET', 
		    url: url_principal+"clientes/buscarCliente/"+idClienteEditar
		}).then(function successCallback(data) {			
			
			$scope.clienteEditar = data.data;
			
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	
	$scope.borrarClienteEnDB=function(){
		$http({
		    method: 'GET', 
		    url : url_principal+"clientes/eliminar/"+$scope.clienteEliminar.id
		}).then(function successCallback(data) {
			getClientes();
			$("#modalELiminarCliente").modal('hide');
			mostrarAlerta("Cliente eliminado con exito","danger");
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	$scope.actualizarDatosCliente=function(){
		$http({
		    method: 'POST', 
		    url : url_principal+"clientes/guardarCambiosCliente",
		    data :JSON.stringify($scope.clienteEditar)
		}).then(function successCallback(data) {
			getClientes();
			$("#modalEdicionCliente").modal('hide');
			mostrarAlerta("Actualización de datos exitosa","info");
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	$scope.agregarCliente=function(){
		$http({
		    method: 'POST', 
		    url : url_principal+"clientes/crear",
		    data :JSON.stringify($scope.clienteNuevo)
		}).then(function successCallback(data) {
			getClientes();
			$("#modalNuevoCliente").modal('hide');
			mostrarAlerta("Cliente agregado exitosamente","success");
		},function errorCallback(e){
			console.log(e);
		});
	}
	
	$scope.siguientePaginaClientes = function(pagina){
		paginaActual=pagina;
		
		$http({
		    method: 'GET', 
		    url: paginaActual
		}).then(function successCallback(data) {
			$scope.clientes=data.data.content;
		},function errorCallback(e){
			console.log(e);
		});
	};
	
	function getClientes(){
		$http({
		    method: 'GET', 
		    url: url_principal+"clientes/listar"
		}).then(function successCallback(data) {
			var cantidadBotonesPaginado = data.data.totalPages;
			
			if(($scope.mostrarBotonesPaginado = cantidadBotonesPaginado>1)){
				for(i=0;i<cantidadBotonesPaginado;i++){
					$scope.botonesPaginado.push(url_principal+"clientes/listar?page="+i);
				}
			}
			
			$scope.clientes=data.data.content;
		},function errorCallback(e){
			console.log(e);
		});
	}
	
});