angular.module("SistemaPuntoDeVenta")
.controller("seccionClientes",function($scope,$http){
	$scope.clientes;

	$http({
	    method: 'GET', 
	    url: url_principal+"clientes/listar2"
	}).then(function successCallback(data) {
		$scope.clientes=data.data;
	},function errorCallback(e){
		console.log(e);
	});

	$scope.eliminarCliente = function(idClienteEliminar){
		console.log("Eliminar cliente "+idClienteEliminar);
	}
	
	$scope.editarCliente=function(idClienteEditar){
		console.log("Editar cliente "+idClienteEditar);
		$scope.clientes.forEach(function(cliente){
			if(cliente.id==idClienteEditar){
				$scope.clienteEditar=cliente;
				console.log($scope.clienteEditar);
				$('#modalEdicionCliente').modal('show');
			}
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