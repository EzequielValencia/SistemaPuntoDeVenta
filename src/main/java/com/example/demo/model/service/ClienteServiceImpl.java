package com.example.demo.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.dao.IClienteDao;
import com.example.demo.model.entity.Cliente;

@Service
public class ClienteServiceImpl implements IClienteService {

	@Autowired private IClienteDao clienteDao;
	
	@Transactional(readOnly=true)
	@Override
	public List<Cliente> findAll() {
		// TODO Auto-generated method stub
		return (List<Cliente>) clienteDao.findAll();
	}

	@Transactional
	@Override
	public void save(Cliente cliente) {
		// TODO Auto-generated method stub
		clienteDao.save(cliente);
	}

	@Transactional(readOnly=true)
	@Override
	public Cliente findOne(Long id) {
		// TODO Auto-generated method stub
		return clienteDao.findOne(id);
	}

	@Transactional
	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		clienteDao.delete(id);
	}

	@Transactional(readOnly=true)
	@Override
	public Page<Cliente> findAll(Pageable page) {
		// TODO Auto-generated method stub
		return clienteDao.findAll(page);
	}
	
	@Transactional(readOnly=true)
	@Override
	public List<Cliente> findByNombreAndApellidoPaternoAndApellidoMaterno(String nombre, String apellidoPaterno,
			String apellidoMaterno) {
		// 
		return clienteDao.findByNombreAndApellidoPaternoAndApellidoMaterno(nombre, apellidoPaterno, apellidoMaterno);
	}
	
	@Transactional(readOnly=true)
	@Override
	public Cliente findByCorreo(String correo) {
		// TODO Auto-generated method stub
		return clienteDao.findByCorreo(correo);
	}
}
