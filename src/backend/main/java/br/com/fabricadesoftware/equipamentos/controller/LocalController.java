package br.com.fabricadesoftware.equipamentos.controller;

import br.com.fabricadesoftware.equipamentos.entity.Local;
import br.com.fabricadesoftware.equipamentos.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class LocalController {

    @Autowired
    private LocalService localService;

    @GetMapping("/locais")
    public List<Local> findAllLocais() {
        return localService.findLocal();
    }

    @PostMapping("/locais")
    public Local createLocal(@RequestBody Local local){
        return localService.createLocal(local);
    }
    @DeleteMapping("/locais/{id}")
    public void deleteLocal(@PathVariable int id) {
        localService.deleteLocal(id);
    }
    @PutMapping("/locais/{id}")
    // adiciona variável id para atualizar informações dos locais
    public Local updateLocais(@PathVariable int id, @RequestBody Local local) {
        return localService.updateLocal(id, local);
    }

}