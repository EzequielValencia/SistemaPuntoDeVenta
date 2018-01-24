package com.example.demo.model.dao;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.model.entity.Factura;

public interface IFacturasDao extends PagingAndSortingRepository<Factura, Long> {
	public List<Factura> findByClienteId(Long id);
}
