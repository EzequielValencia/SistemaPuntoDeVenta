package com.example.demo.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

import com.example.demo.model.dao.IClienteDao;
import com.example.demo.model.dao.IFacturasDao;
import com.example.demo.model.dao.IProductosDao;
import com.example.demo.model.entity.Cliente;
import com.example.demo.model.entity.Factura;
import com.example.demo.model.entity.ItemFactura;
import com.example.demo.model.entity.Producto;

@Controller
@RequestMapping(value="facturas")
public class FacturasController {

	private @Autowired IFacturasDao facturasServices;
	private @Autowired IClienteDao clienteService;
	private @Autowired IProductosDao productosDao;
	
	@GetMapping(value="")
	public String listaFacturas(){
		
		return "facturas/listadoFacturas";
	}
	
	@GetMapping(value="/listaFacturas")
	public @ResponseBody List<Factura> listadoFacturas(){
		return (List<Factura>)facturasServices.findAll();
	}
	
	@GetMapping(value="/listaFacturasPorFecha")
	public @ResponseBody List<Factura> listaFacturasPorFecha(@RequestParam(value="fechaSolicitada")String fechaSolicitada){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
		
		try {
			return facturasServices.findByFechaRealizacion(sdf.parse(fechaSolicitada));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping(value="/nueva")
	public String nuevaFactura() {
		return "facturas/nuevaFactura";
	}
	
	@GetMapping(value="/nuevaFactura")
	public @ResponseBody Factura getNuevaFactura() {
		Factura f = new Factura();
		return f;
	}
	
	@GetMapping(value="/listadoFacturas")
	public String listadoFacturas(Model model){
		model.addAttribute("facturas",(List<Factura>) facturasServices.findAll());
		return "facturas/listaFacturas"; 
	}
	
	
	@GetMapping(value="/detallesFactura")
	public String getFactura(@RequestParam(value="idFactura") Long idFactura,Model model) {
		Factura f = facturasServices.findOne(idFactura);
		model.addAttribute("factura", f);
		return "facturas/detalleFactura";
	}
	
	@GetMapping(value="/factura")
	public @ResponseBody Factura getFactura(@RequestParam(value="idFactura") Long idFactura){
		return facturasServices.findOne(idFactura);
	}
	
	@PostMapping(value="/eliminarFactura")
	public @ResponseBody Boolean eliminarFactura(@RequestBody Factura factura) {
		facturasServices.delete(factura);
		return new Boolean(true);
	}
	
	@PostMapping(value="/guardarFactura/{cliente}")
	public @ResponseBody Boolean guardarFactura(@RequestBody Factura factura,@PathVariable(value="cliente") Long cliente) {
		Cliente clienteAsociado = clienteService.findOne(cliente);
		factura.setCliente(clienteAsociado);
		facturasServices.save(factura);
		Producto productoItemFactura;
		
		for(ItemFactura itemFactura:factura.getItemsFactura()) {
			productoItemFactura = itemFactura.getProducto();
			Integer existencia = productoItemFactura.getExistencia();
			productoItemFactura.setExistencia(existencia-itemFactura.getCantidad());
			productosDao.save(productoItemFactura);
		}
		
		Boolean seGuardo = new Boolean(true);
		return seGuardo;
	}
}
