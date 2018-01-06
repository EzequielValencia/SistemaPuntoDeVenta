angular.module("SistemaPuntoDeVenta")
.controller("seccionClientes",function($scope,$http){
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
			//$('#modalEdicionCliente').modal('show');
			
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
		$http({
		    method: 'GET', 
		    url: pagina
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




/*
$('.btn-warning').on('click', function() {
	var idCliente = $(this).data('cliente');
	$.ajax({
		url : url_principal+"clientes/" + idCliente,
		type : "GET",
	}).done(function(data) {
		console.log(data.nombre);
		llenaDatosModalEdicion(data);
		$('#modalEdicionCliente').modal('show');
	}).fail(function(error) {
		console.log(error);
	});

});

$("#guardarCambiosCliente").on('click', function() {
	var cliente = {
		nombre : $("#nombreNuevo").val(),
		apellidoPaterno : $("#apellidoPaternoNuevo").val(),
		apellidoMaterno : $("#apellidoMaternoNuevo").val(),
		compania : $("#companiaNuevo").val(),
		correo : $("#correoNuevo").val(),
		id : $("#id").val(),
		fechaCreacion:$("#fechaCreacion").val()
	};
	$.ajax({
		url : url_principal+"clientes/guardarCambiosCliente",
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		data :JSON.stringify(cliente)
	}).done(function(data) {
		location.reload();
	}).fail(function(error) {
		console.log(error);
	});
	
});

$("#guardarCambiosCliente").on('click', function() {
	var cliente = {
		nombre : $("#nombreNuevo").val(),
		apellidoPaterno : $("#apellidoPaternoNuevo").val(),
		apellidoMaterno : $("#apellidoMaternoNuevo").val(),
		compania : $("#companiaNuevo").val(),
		correo : $("#correoNuevo").val(),
		id : $("#id").val(),
		fechaCreacion:$("#fechaCreacion").val()
	};
	$.ajax({
		url : url_principal+"clientes/guardarCambiosCliente",
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		data :JSON.stringify(cliente)
	}).done(function(data) {
		location.reload();
	}).fail(function(error) {
		console.log(error);
	});
});

$("#eliminarCliente").on('click', function() {
	var id = $("#idClienteEliminar").val();
	$.ajax({
		url : url_principal+"clientes/eliminar/"+id,
		type : "GET"
	}).done(function(data) {
		if(data==true){
			location.reload();
		}
	}).fail(function(error) {
		console.log(error);
	});
});

$('.btn-danger').on('click', function() {
	var idCliente = $(this).data('cliente');
	$.ajax({
		url : url_principal+"clientes/" + idCliente,
		type : "GET",
	}).done(function(data) {
		llenarTituloModalEliminarCliente(data);
		$('#modalELiminarCliente').modal('show');
	}).fail(function(error) {
		console.log(error);
	});

});


function llenarTituloModalEliminarCliente(cliente){
	$("#tituloModalEliminar").append(
			"Realmente quieres eliminar a " + cliente.nombre + " "
					+ cliente.apellidoPaterno + " " + cliente.apellidoMaterno);
	
	$("#idClienteEliminar").val(cliente.id);
}

function llenaDatosModalEdicion(cliente) {
	$("#tituloModalEdicion").append(
			"Editado los datos de " + cliente.nombre + " "
					+ cliente.apellidoPaterno + " " + cliente.apellidoMaterno);
	
	$("#id").val(cliente.id);
	$("#nombreNuevo").val(cliente.nombre);
	$("#apellidoPaternoNuevo").val(cliente.apellidoPaterno);
	$("#apellidoMaternoNuevo").val(cliente.apellidoMaterno);
	$("#companiaNuevo").val(cliente.compania);
	$("#correoNuevo").val(cliente.correo);
	$("#fechaCreacion").val(cliente.fechaCreacion);
}
*/