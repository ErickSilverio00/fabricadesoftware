package br.com.fabricadesoftware.equipamentos.controller;

import br.com.fabricadesoftware.equipamentos.entity.Agenda;
import br.com.fabricadesoftware.equipamentos.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AgendaController {
    @Autowired
    private AgendaService agendaService;

    @GetMapping("/agendas")
    public List<Agenda> findAllAgendas() {
        return agendaService.findAgenda();
    }

    @PostMapping("/agendas")
    public Agenda createAgenda(@RequestBody Agenda agenda) {
        return agendaService.createAgenda(agenda);
    }

    @DeleteMapping("/agendas/{id}")
    public void deleteAgenda(@PathVariable int id) {
        agendaService.deleteAgenda(id);
    }
    @PutMapping("/agendas/{id}")
    public Agenda updateAgenda(@PathVariable int id, @RequestBody Agenda agenda) {
        return agendaService.updateAgenda(id, agenda);
    }
}
