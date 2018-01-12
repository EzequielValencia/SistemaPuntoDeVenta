package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.dao.IFacturasDao;
import com.example.demo.model.entity.Factura;

@Controller
@RequestMapping(value="facturas")
public class FacturasController {

	private @Autowired IFacturasDao facturasServices;
	/*@Autowired
	private IClienteService clienteService;*/
	
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
	
	@PostMapping(value="/guardarFactura")
	public @ResponseBody Boolean guardarFactura(@RequestBody Factura factura) {
		System.out.println(factura);
		Boolean seGuardo = new Boolean(true);
		return seGuardo;
	}
}
