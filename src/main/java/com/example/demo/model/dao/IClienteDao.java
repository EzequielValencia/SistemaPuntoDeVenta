package com.example.demo.model.dao;

import java.util.List;

import com.example.demo.model.entity.Cliente;

public interface IClienteDao {

	public List<Cliente> findAll();
	
	public void save(Cliente cliente);
	
	public Cliente findOne(Long id);
	
	public void removeOne(Cliente cliente);
}
