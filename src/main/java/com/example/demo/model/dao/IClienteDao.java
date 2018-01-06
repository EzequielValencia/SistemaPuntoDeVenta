package com.example.demo.model.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.model.entity.Cliente;

public interface IClienteDao extends PagingAndSortingRepository<Cliente, Long> {

}
