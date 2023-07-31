package br.com.fabricadesoftware.equipamentos.service;

import br.com.fabricadesoftware.equipamentos.entity.Colaborador;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ColaboradorService {
    // cria um arrayList para armazenar os colaboradores
    List<Colaborador> listaColaboradores;
    int idAtual;

    public ColaboradorService() {
        this.listaColaboradores = new ArrayList<>();
        this.idAtual = 1;
    }

    /**
     * Método responsável por adicionar um colaborador na lista
     */
    public Colaborador createColaborador(Colaborador colaborador) {
        //define a id do colaborador
        colaborador.setId(this.idAtual);
        // incrementa o id
        this.idAtual++;
        //adiciona colaborador à lista
        listaColaboradores.add(colaborador);
        // cria o objeto colaborador
        return colaborador;
    }
    /**
     * Método responsável por criar uma lista de colaboradores
     */
    public List<Colaborador> findColaborador() {
        return listaColaboradores;
    }

    /**
     * Método responsável por deletar um colaborador
     */
    public void deleteColaborador(int id) {
        listaColaboradores.removeIf(colaborador -> colaborador.getId() == id);
    }

    /**
     * Método responsável por atualizar informações de um colaborador
     */

    // alterar o tipo do colaborador para String colaborador
    public Colaborador updateColaborador(int id, Colaborador colaborador) {
        for (Colaborador colaboradorExistente: listaColaboradores) {
            if(colaboradorExistente.getId() == id) {
                colaboradorExistente.setNome(colaborador.getNome());
                colaboradorExistente.setTipoColaborador((colaborador.getTipoColaborador()));
                return colaboradorExistente;
            }
        }
        return null;
    }
}