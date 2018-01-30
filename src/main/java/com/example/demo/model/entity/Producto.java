package com.example.demo.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * <p>
 * Producto.<br>
 * Contiene los datos que describen a un solo producto de la base de datos.
 * </p>
 * @author Ezequiel Valencia Moreno
 */
@Entity
@Table(name="productos")
public class Producto implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String nombre;
	
	@Column(name="precio_costo")
	private Double precioCosto=0.0;
	
	@Column(name="porcentaje_ganancia",nullable=false,columnDefinition="double default 0")
	private Double porcentajeGanancia=0D;
	
	@Column(name="precio_venta")
	private Double precioVenta=0.0;
	
	@Column(name="cantidad_minima")
	private Integer cantidadMinima;

	private Integer existencia;

	
	
	public Double getPorcentajeGanancia() {
		return porcentajeGanancia;
	}

	public void setPorcentajeGanancia(Double porcentajeGanancia) {
		this.porcentajeGanancia = porcentajeGanancia;
	}

	public Integer getExistencia() {
		return existencia;
	}

	public void setExistencia(Integer existencia) {
		this.existencia = existencia;
	}


	public Integer getCantidadMinima() {
		return cantidadMinima;
	}

	public void setCantidadMinima(Integer cantidadMinima) {
		this.cantidadMinima = cantidadMinima;
	}

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getNombre() {
		return nombre;
	}



	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public Double getPrecioCosto() {
		return precioCosto;
	}

	public void setPrecioCosto(Double precioCosto) {
		this.precioCosto = precioCosto;
	}

	public Double getPrecioVenta() {
		return precioVenta;
	}

	public void setPrecioVenta(Double precioVenta) {
		this.precioVenta = precioVenta;
	}

	@Override
	public String toString() {
		return "Producto [id=" + id + ", nombre=" + nombre + ", precio=" + precioCosto 
				+ ", existencia=" + existencia + "]";
	}



	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
