let expressao = ''; // Cria uma variável global chamada *expressao* para guardar a expressão matematica
let resultadoPronto = false; // Indica se o ultimo resultado foi calculado

// Adiciona um valor na variavel *expressao*
function adicionar(valor) {
    // Se o resultado de uma operação anterior foi calculado e o usuário está adicionando algo, reinicie a expressão com o resultado anterior
    if (resultadoPronto) {
        expressao = String(document.getElementById('input').value);
        resultadoPronto = false; // Marca que o resultado não está mais pronto para novas operações
    }
    const operadores = ['+', '-', '*', '/'];
    const ultimoCaractere = expressao.slice(-1); // Obtém o último caractere da expressão atual

    // Se o valor que está sendo adicionado é um operador e o último caractere também é um operador
    if (operadores.includes(valor) && operadores.includes(ultimoCaractere)) {
        expressao = expressao.slice(0, -1) + valor; // Substitui o último operador pelo novo operador
    } else {
        expressao += valor;// Adiciona o valor à expressão atual
    }

    document.getElementById('input').value = expressao; // Atualiza o input com a nova expressao
}

// Limpa o input
function limpar() {
    expressao = ''; // Limpa a expressão atual
    document.getElementById('input').value = ''; // Limpa o input
    resultadoPronto = false;
}

// Calcula o resultado da expressao
function calcular() {
    try {
        // Remove múltiplos sinais de operadores seguidos e operadores no final
        expressao = expressao.replace(/([+\-*/]){2,}/g, '$1').replace(/([+\-*/])$/, '');// Remove operador no final e multiplos operadores

        if (expressao) {
            let resultado = eval(expressao); // Pega a *expressao* e adiciona na variavel resultado
            document.getElementById('input').value = resultado; // Atualiza o input com o resultado
            expressao = String(resultado); // Atualiza a variavel *expressao* com o resultado para poder fazer novos calculos na sequencia
            resultadoPronto = true;
        }
    } catch (error) {
        document.getElementById('input').value = 'Erro';
        expressao = '';
        resultadoPronto = false;
    }
}


// Calcula a raiz quadrada
function raiz() {
    let valor = eval(expressao); // Pega a expressao atual e adiciona na variavel valor
    let resultado = Math.sqrt(valor); // Calcula a raiz quadrada do valor obtido
    document.getElementById('input').value = resultado; // Atualiza o input com o resultado
    expressao = resultado; // Atualiza a variavel *expressao* com o resultado para poder fazer novos calculos na sequencia
}

  // Função para lidar com a entrada do teclado
  function teclado(event) {
    const tecla = event.key;

    // Verifica se a tecla pressionada é um número ou operador e adiciona à expressão
    if (!isNaN(tecla) || ['+', '-', '*', '/'].includes(tecla)) {
        adicionar(tecla);
    }

    // Se a tecla Enter for pressionada, calcula o resultado
    if (tecla === 'Enter') {
        calcular();
    }

    // Se a tecla Backspace for pressionada, remove o último caractere da expressão
    if (tecla === 'Backspace') {
        expressao = expressao.slice(0, -1);
        document.getElementById('input').value = expressao;
    }

    // Se a tecla Escape for pressionada, limpa a expressão
    if (tecla === 'Escape') {
        limpar();
    }
}

// Adiciona um ouvinte de eventos para capturar as teclas pressionadas
document.addEventListener('keydown', teclado);




