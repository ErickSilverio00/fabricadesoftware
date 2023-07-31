export function validacaoTitulo(titulo) {
    if (!titulo || titulo.trim() === "") {
        return {
          valido: false,
          mensagem: "O título é obrigatório.",
        };
      }
    
      if (titulo.length < 5) {
        return {
          valido: false,
          mensagem: "O título deve ter pelo menos 5 caracteres.",
        };
      }
    
      return {
        valido: true,
        mensagem: "",
      };
}

export function validacaoData(dataInicio, dataTermino) {
  if (!(dataInicio instanceof Date) || isNaN(dataInicio.getTime())) {
    return {
      valido: false,
      mensagem: "Por favor, informe uma data de início válida.",
    };
  }

  if (!(dataTermino instanceof Date) || isNaN(dataTermino.getTime())) {
    return {
      valido: false,
      mensagem: "Por favor, informe uma data de término válida.",
    };
  }

  if (dataInicio.getTime() === dataTermino.getTime()) {
    return {
      valido: false,
      mensagem: "A data de início não pode ser igual a data de término.",
    };
  }

  if (dataInicio > dataTermino) {
    return {
      valido: false,
      mensagem: "A data de início não pode ser maior que a data de término.",
    };
  }

  return {
    valido: true,
    mensagem: "",
  };
}

export function validacaoObservacao(observacao) {
    if (!observacao || observacao.trim() === "") {
        return {
          valido: false,
          mensagem: "A observação é obrigatória.",
        };
      }
    
      if (observacao.length < 5) {
        return {
          valido: false,
          mensagem: "A observação deve ter pelo menos 5 caracteres.",
        };
      }
    
      return {
        valido: true,
        mensagem: "",
      };
}