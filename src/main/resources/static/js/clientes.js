
$('.btn-warning').on('click', function() {
	var idCliente = $(this).data('cliente');
	$.ajax({
		url : "http://localhost:8080/clientes/" + idCliente,
		type : "GET",
	}).done(function(data) {
		console.log(data.nombre);
		llenaDatosModalEdicion(data);
		$('#modalEdicionCliente').modal('show');
	}).fail(function(error) {
		console.log(error);
	});

});

$('#modalEdicionCliente').on('hidden.bs.modal', function(e) {
	$("#tituloModalEdicion").empty();
	$("#id").empty();
	$("#nombreNuevo").empty();
	$("#apellidoPaternoNuevo").empty();
	$("#apellidoMaternoNuevo").empty();
	$("#companiaNuevo").empty();
	$("#correoNuevo").empty();
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
		url : "http://localhost:8080/clientes/guardarCambiosCliente",
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		data :JSON.stringify(cliente)
	}).done(function(data) {
		$("#modalEdicionCliente").modal("hide");
	}).fail(function(error) {
		console.log(error);
	});
});

function llenaDatosModalEdicion(cliente) {
	console.log(cliente);
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
