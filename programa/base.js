const { verificacoesPrevias, procurarArquivos, lerArquivosUmaOcorrencia, lerArquivoTodasOcorrencias } = require('./estrutura.js');

// Modo 'Um' para uma ocorrência / Modo 'Todos' para todas as ocorrências;
const decisaoOcorrencia = 'Um';

// Escreva o trecho que busca dar match, é sensitive case;
const trechoAProcurar = 'banana'

verificacoesPrevias(decisaoOcorrencia, trechoAProcurar);
const arquivosNome = procurarArquivos();

let resultado;

if(decisaoOcorrencia == 'Um') {
    resultado = lerArquivosUmaOcorrencia(arquivosNome, trechoAProcurar);
} else if(decisaoOcorrencia == 'Todos') {
    resultado = lerArquivoTodasOcorrencias(arquivosNome, trechoAProcurar);
}

if(resultado !== undefined) {
    console.log(resultado);
} else {
    console.log('Não foi achado qualquer resultado')
}