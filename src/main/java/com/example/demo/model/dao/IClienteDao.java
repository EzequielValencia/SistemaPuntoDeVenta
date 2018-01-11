package com.example.demo.model.dao;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.model.entity.Cliente;

public interface IClienteDao extends PagingAndSortingRepository<Cliente, Long> {

	
	public List<Cliente> findByNombreAndApellidoPaternoAndApellidoMaterno(String nombre,String apellidoPaterno,
			String apellidoMaterno);
	public Cliente findByCorreo(String correo);
}
