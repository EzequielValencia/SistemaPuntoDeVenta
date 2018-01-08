package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="productos")
public class ProductosController {
	
	@GetMapping(value="")
	public String index() {
		return "productos/productos";
	}

}
