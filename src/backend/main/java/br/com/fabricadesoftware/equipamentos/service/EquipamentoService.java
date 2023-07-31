package br.com.fabricadesoftware.equipamentos.service;

import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipamentoService {
    List<Equipamento> objeto;
    int idAtual;

    public EquipamentoService() {
        this.objeto = new ArrayList<>();
        this.idAtual = 1;
    }

    /**
     * Método responsável por adicionar um equipamento na lista
     */
    public Equipamento createEquipamento(Equipamento equipamento) {
        // lógica para setar o id do equipamento criado
        equipamento.setId(this.idAtual);
        this.idAtual++;
        objeto.add(equipamento);
        return equipamento;
    }

    /**
     * Método responsável por criar uma lista de equipamento na lista
     */

    public List<Equipamento> findEquipamento() {
        return objeto;
    }

    /**
     * Método responsável por deletar um equipamento na lista
     */
    public void deleteEquipamento(int id) {
        objeto.removeIf(equipamento -> equipamento.getId() == (id));
    }

    /**
     * Método responsável por atualizar informações de um equipamento na lista
     */
    public Equipamento updateEquipamento(int id, Equipamento equipamento) {
        //iterar sobre o objeto e procurar pelo id
        for (Equipamento equipamentoExistente : objeto) {
            if (equipamentoExistente.getId() == id) {
                equipamentoExistente.setDescricao(equipamento.getDescricao());
                equipamentoExistente.setObservacao(equipamento.getObservacao());
                return equipamentoExistente;
            }
        }
        return null;
    }
}