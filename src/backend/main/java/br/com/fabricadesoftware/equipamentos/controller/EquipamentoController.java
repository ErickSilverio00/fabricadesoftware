package br.com.fabricadesoftware.equipamentos.controller;

import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import br.com.fabricadesoftware.equipamentos.service.EquipamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class EquipamentoController {
    @Autowired
    private EquipamentoService equipamentoService;
    @GetMapping("/equipamentos")
    public List<Equipamento> findAllEquipamentos() {
        return equipamentoService.findEquipamento();
    }
    @PostMapping("/equipamentos")
    public Equipamento createEquipamento(@RequestBody Equipamento equipamento){
        return equipamentoService.createEquipamento(equipamento);
    }
    @DeleteMapping("/equipamentos/{id}")
    public void deleteEquipamento(@PathVariable int id) {
        equipamentoService.deleteEquipamento(id);
    }
    @PutMapping("/equipamentos/{id}")
    public Equipamento updateEquipamento(@PathVariable int id, @RequestBody Equipamento equipamento) {
        return equipamentoService.updateEquipamento(id, equipamento);
    }
}