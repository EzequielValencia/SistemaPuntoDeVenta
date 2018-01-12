package com.example.demo.model.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.model.entity.Producto;

public interface IProductosDao extends PagingAndSortingRepository<Producto, Long> {

}
