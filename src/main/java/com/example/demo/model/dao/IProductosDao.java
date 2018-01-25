package com.example.demo.model.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.model.entity.Producto;

public interface IProductosDao extends PagingAndSortingRepository<Producto, Long> {

	@Query("select p from Producto p where p.id=?1 and p.existencia>=1 ")
	public Producto findeOneByIdAndExistenciaHigherOne(Long id);
}
