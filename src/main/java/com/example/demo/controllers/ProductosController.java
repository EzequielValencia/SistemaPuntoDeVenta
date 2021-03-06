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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.dao.IProductosDao;
import com.example.demo.model.entity.Producto;


@Controller
@RequestMapping(value="productos")
public class ProductosController {
	
	private @Autowired IProductosDao productosService;
	
	
	@GetMapping(value="")
	public String index(Model model) {
		return "productos/productos";
	}

	@GetMapping(value="/listaProductos")
	public @ResponseBody List<Producto> listaProductos(){

		List<Producto> productos = (List<Producto>) productosService.findAll();
		return productos;
	}
	
	@PostMapping(value="/guardarProducto")
	public @ResponseBody Boolean crearProducto(@RequestBody Producto producto){
		productosService.save(producto);
		return new Boolean(true);
	}

	@GetMapping(value="/producto/{id}")
	public @ResponseBody Producto getProducto(@PathVariable(value="id") Long id){
		Producto producto = productosService.findOne(id);
		return producto;	
	}
	
	@GetMapping(value="/productoParaFactura")
	public @ResponseBody Producto getProductoFactura(@RequestParam(value="idProducto") Long id) {
		Producto encontrado=null;
		encontrado=productosService.findOne(id);
		if(encontrado!=null && encontrado.getExistencia()>=1) {
			System.out.println("Si hay aun de ese producto");
			encontrado.setExistencia(encontrado.getExistencia()-1);
			productosService.save(encontrado);
			encontrado.setExistencia(encontrado.getExistencia()+1);
		}
		System.out.println("Ya no  hay de ese producto");
		return encontrado;
	}
	
	@PostMapping(value="/reestablercerExistenciaProducto")
	public @ResponseBody Boolean reestablercerExistenciaProducto(@RequestParam(value="cantidadAReestablecer")Integer cantidadAReestablecer,
												@RequestParam(value="idProducto") Long idProducto) {
		Producto p = productosService.findOne(idProducto);
		p.setExistencia(p.getExistencia()+cantidadAReestablecer);
		productosService.save(p);
		return new Boolean(true);
	}
	
	@PostMapping(value="/eliminarProducto")
	public @ResponseBody Boolean eliminarProducto(@RequestBody Producto producto) {
		
		System.out.println(producto);
		productosService.delete(producto);
		return new Boolean(true);
	}
}
