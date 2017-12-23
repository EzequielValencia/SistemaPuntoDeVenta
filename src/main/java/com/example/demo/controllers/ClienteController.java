package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.model.dao.IClienteDao;
import com.example.demo.model.entity.Cliente;

@Controller
@RequestMapping(value="clientes")
public class ClienteController {

	private @Autowired  IClienteDao clienteDao;
	
	@RequestMapping(value="/listar",method=RequestMethod.GET)
	public String listarClientes(Model model) {
		model.addAttribute("clientes", clienteDao.findAll());
		return "clientes/listaClientes";
	}
	@GetMapping(value="/crear")
	public String crearCliente(Model model){
		Cliente nuevo = new Cliente();
		model.addAttribute("nuevoCliente",nuevo);
		return "clientes/crear";
	}
	@PostMapping(value="crear")
	public String crearClienteNuevo(Cliente cliente) {
		System.out.println(cliente);
		clienteDao.save(cliente);
		return "redirect:listar";
	}
}
