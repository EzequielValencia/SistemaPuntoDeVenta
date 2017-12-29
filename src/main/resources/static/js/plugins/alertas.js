function mostrarAlerta(mensaje,colorFondo){
	$("#alerta").addClass(colorFondo)
    $("#alerta").addClass("show");
    $("#alerta").append(mensaje);
    setTimeout(function(){ $("#alerta").removeClass(); $("#alerta").empty() }, 3000);
}