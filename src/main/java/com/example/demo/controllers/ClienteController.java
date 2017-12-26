package com.example.demo.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
		Cliente cliente = new Cliente();
		model.addAttribute("cliente",cliente);
		return "clientes/crear";
	}
	
	@PostMapping(value="/crear")
	public String crearClienteNuevo(@Valid Cliente cliente, BindingResult result) {
		if(result.hasErrors()) {
			System.out.println(result.getAllErrors());
			return "clientes/crear";
		}
		clienteDao.save(cliente);
		return "redirect:listar";
	}
	
	@GetMapping(value="/{id}")
	public String buscarCliente(@PathVariable(value="id") Long id,Model model) {
		Cliente cliente = clienteDao.findOne(id);
		System.out.println(cliente);
		model.addAttribute("cliente", cliente);
		model.addAttribute("titulo","Actualizar datos de "+cliente.getNombre()+" "+cliente.getApellidoPaterno()+
				" "+cliente.getApellidoMaterno());
		return "clientes/crear";
	}
	
	@PostMapping(value="/guardarCambiosCliente")
	public String guardarCambios(Cliente cliente) {
		clienteDao.save(cliente);
		return "redirect:listar";
	}
}
