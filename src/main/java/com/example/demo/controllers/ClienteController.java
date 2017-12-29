package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.entity.Cliente;
import com.example.demo.model.service.IClienteService;

@Controller
@RequestMapping(value="clientes")
public class ClienteController {

	private @Autowired  IClienteService clienteService;
	
	@RequestMapping(value="/",method=RequestMethod.GET)
	public String listarClientes(Model model) {
		model.addAttribute("clientes", clienteService.findAll());
		return "clientes/listaClientes";
	}
	
	@RequestMapping(value="/listar",method=RequestMethod.GET)
	public @ResponseBody List<Cliente> listarClientes() {
		return clienteService.findAll();
	}
		
	@PostMapping(value="/crear")
	public String crearClienteNuevo(@RequestBody Cliente cliente) {
		clienteService.save(cliente);
		return "redirect:listar";
	}
	
	@GetMapping(value="buscarCliente/{id}")
	public @ResponseBody Cliente buscarCliente(@PathVariable(value="id") Long id) {
		Cliente cliente = clienteService.findOne(id);
		
		return cliente;
	}
	
	@PostMapping(value="/guardarCambiosCliente")
	public String guardarCambios(@RequestBody Cliente cliente) {
		clienteService.save(cliente);
		return "redirect:listar";
	}
	
	@GetMapping(value="/eliminar/{id}")
	public @ResponseBody boolean eliminarCliente(@PathVariable(value="id") Long id){
		clienteService.delete(id);
		return true;
	}
}
