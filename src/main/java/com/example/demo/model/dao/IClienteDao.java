package com.example.demo.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

}
