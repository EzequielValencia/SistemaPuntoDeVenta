package com.example.demo.model.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.model.entity.Factura;

public interface IFacturasDao extends PagingAndSortingRepository<Factura, Long> {
	
}
