package com.example.demo.model.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="facturas")
public class Factura implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8392723628162818348L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String observacion;
	
	@Temporal(TemporalType.DATE)
	@Column(name="fecha_realizacion")
	private Date fechaRealizacion;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnore
	private Cliente cliente;
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	@JoinColumn(name="factura_id")
	private List<ItemFactura> itemsFactura;

	@Column(name="pago_con")
	private Double pagoCon;
	
	private Double total;

	private Boolean cancelado;
	
	public Boolean getCancelado() {
		return cancelado;
	}



	public void setCancelado(Boolean cancelado) {
		this.cancelado = cancelado;
	}



	public Factura() {
		itemsFactura = new ArrayList<ItemFactura>();
	}
	
	
	
	public Double getPagoCon() {
		return pagoCon;
	}



	public void setPagoCon(Double pagoCon) {
		this.pagoCon = pagoCon;
	}



	public Cliente getCliente() {
		return cliente;
	}



	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	@PrePersist
	public void prePersist(){
		fechaRealizacion = new Date();
	}
	
	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getObservacion() {
		return observacion;
	}



	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}



	public Date getFechaRealizacion() {
		return fechaRealizacion;
	}



	public void setFechaRealizacion(Date fechaRealizacion) {
		this.fechaRealizacion = fechaRealizacion;
	}


	
	public void addItemFactura(ItemFactura item) {
		itemsFactura.add(item);
	}
	
	public List<ItemFactura> getItemsFactura() {
		return itemsFactura;
	}


	public void setItemsFactura(List<ItemFactura> itemsFactura) {
		this.itemsFactura = itemsFactura;
	}




	public Double getTotal() {
		return total;
	}


	public void setTotal(Double total) {
		this.total = total;
	}


	@Override
	public String toString() {
		return "Factura [id=" + id + ", observacion=" + observacion + ", fechaRealizacion=" + fechaRealizacion
				+ ", cliente=" + cliente.toString() + ", itemsFactura=" + itemsFactura.size() + "]";
	}
	
	

}
