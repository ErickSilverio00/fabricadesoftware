package br.com.fabricadesoftware.equipamentos.service;

import br.com.fabricadesoftware.equipamentos.entity.Agenda;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class AgendaService {

    List<Agenda> listaAgendas;
    int idAtual;

    public AgendaService() {
        this.listaAgendas = new ArrayList<>();
        this.idAtual = 1;
    }

    /**
     * Método responsável por adicionar uma agenda na lista
     */
    public Agenda createAgenda(Agenda agenda) {
        // lógica para setar o id da agenda criada
        agenda.setId(this.idAtual);
        this.idAtual++;
        listaAgendas.add(agenda);
        return agenda;
    }

    /**
     * Método responsável por criar uma lista de agendas na lista
     */

    public List<Agenda> findAgenda() {
        return listaAgendas;
    }

    /**
     * Método responsável por deletar uma agenda na lista
     */
    public void deleteAgenda(int id) {
        listaAgendas.removeIf(agenda -> agenda.getId() == (id));
    }

    /**
     * Método responsável por atualizar informações de uma agenda na lista
     */
    public Agenda updateAgenda(int id, Agenda agenda) {
        //iterar sobre o objeto e procurar pelo id
        for (Agenda agendaExistente : listaAgendas) {
            if (agendaExistente.getId() == id) {
                agendaExistente.setTitulo(agenda.getTitulo());
                agendaExistente.setObservacao(agenda.getObservacao());
                agendaExistente.setDataInicio(agenda.getDataInicio());
                agendaExistente.setDataTermino(agenda.getDataTermino());
                agendaExistente.setColaborador(agenda.getColaborador());
                agendaExistente.setLocal(agenda.getLocal());
                agendaExistente.setEquipamento(agenda.getEquipamento());
                return agendaExistente;
            }
        }
        return null;
    }
}
