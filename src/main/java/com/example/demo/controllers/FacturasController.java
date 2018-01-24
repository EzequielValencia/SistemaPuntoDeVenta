package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.dao.IClienteDao;
import com.example.demo.model.dao.IFacturasDao;
import com.example.demo.model.entity.Cliente;
import com.example.demo.model.entity.Factura;

@Controller
@RequestMapping(value="facturas")
public class FacturasController {

	private @Autowired IFacturasDao facturasServices;
	
	private @Autowired IClienteDao clienteService;
	
	@GetMapping(value="/nueva")
	public String nuevaFactura() {
		return "facturas/nuevaFactura";
	}
	
	@GetMapping(value="/nuevaFactura")
	public @ResponseBody Factura getNuevaFactura() {
		Factura f = new Factura();
		return f;
	}
	
	@GetMapping(value="/{idFactura}")
	public @ResponseBody Factura getFactura(@PathVariable(value="idFactura") Long id ) {
		return facturasServices.findOne(id);
	}
	
	@PostMapping(value="/guardarFactura/{cliente}")
	public @ResponseBody Boolean guardarFactura(@RequestBody Factura factura,@PathVariable(value="cliente") Long cliente) {
		Cliente clienteAsociado = clienteService.findOne(cliente);
		factura.setCliente(clienteAsociado);
		facturasServices.save(factura);
		Boolean seGuardo = new Boolean(true);
		return seGuardo;
	}
}
