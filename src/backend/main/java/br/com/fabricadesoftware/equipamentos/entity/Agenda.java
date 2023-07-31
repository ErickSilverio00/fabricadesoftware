package br.com.fabricadesoftware.equipamentos.entity;

import java.util.Date;

public class Agenda {
    private int id;
    private String titulo;

    private Date dataInicio;

    private Date dataTermino;

    private String observacao;
    private Colaborador colaborador;

    private Local local;
    private Equipamento equipamento;

    public Agenda() {
        
    }

    public Agenda(int id, String titulo, Date dataInicio, Date dataTermino, String observacao, Colaborador colaborador, Local local, Equipamento equipamento) {
        this.id = id;
        this.titulo = titulo;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
        this.observacao = observacao;
        this.colaborador = colaborador;
        this.local = local;
        this.equipamento = equipamento;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(Date dataTermino) {
        this.dataTermino = dataTermino;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public void setColaborador(Colaborador colaborador) {
        this.colaborador = colaborador;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public Equipamento getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(Equipamento equipamento) {
        this.equipamento = equipamento;
    }
}
