package com.example.demo.model.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.entity.Cliente;

@Repository
public class ClienteDaoImplements implements IClienteDao {
	@PersistenceContext
	private EntityManager em;
	
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly=true)
	@Override
	public List<Cliente> findAll() {
		// TODO Auto-generated method stub
		return em.createQuery("from Cliente").getResultList();
	}
	
	
	@Override
	@Transactional
	public void save(Cliente cliente) {
		System.out.println("Guardando "+cliente);
		if(cliente.getId()>0 & cliente.getId()!=null) {
			System.out.println("Editado "+em.merge(cliente));
		}
		em.persist(cliente);
	}

	@Override
	public Cliente findOne(Long id) {
		// TODO Auto-generated method stub
		return em.find(Cliente.class, id);
	}

}
