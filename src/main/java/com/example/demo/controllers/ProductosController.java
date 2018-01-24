package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.dao.IProductosDao;
import com.example.demo.model.entity.Producto;

@Controller
@RequestMapping(value="productos")
public class ProductosController {
	
	private @Autowired IProductosDao productosService;
	
	
	@GetMapping(value="")
	public String index() {
		return "productos/productos";
	}

	@GetMapping(value="/listaProductos")
	public @ResponseBody List<Producto> listaProductos(){
		return (List<Producto>)productosService.findAll();
	}
	
	@GetMapping(value="/producto/{id}")
	public @ResponseBody Producto getProducto(@PathVariable(value="id") Long id){
		Producto producto = productosService.findOne(id);
		
			return producto;
		
	}
}
