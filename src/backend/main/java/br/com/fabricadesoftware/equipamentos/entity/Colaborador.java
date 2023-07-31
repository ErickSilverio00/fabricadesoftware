package br.com.fabricadesoftware.equipamentos.entity;

public class Colaborador {
    private int id;
    private String nome;
    private String tipoColaborador;

    public Colaborador() {
        
    }

    public Colaborador(int id, String nome, String tipoColaborador) {
        this.id = id;
        this.nome = nome;
        this.tipoColaborador = tipoColaborador;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipoColaborador() {
        return tipoColaborador;
    }

    public void setTipoColaborador(String tipoColaborador) {
        this.tipoColaborador = tipoColaborador;
    }
}
