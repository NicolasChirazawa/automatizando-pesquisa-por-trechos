import { verificacoesPrevias, procurarArquivos, lerArquivosUmaOcorrencia, lerArquivoTodasOcorrencias } from './estrutura.js'

// Modo 'Um' para uma ocorrência / Modo 'Todos' para todas as ocorrências;
const decisaoOcorrencia = 'Um';

// Escreva o trecho que busca dar match, é sensitive case;
const trechoAProcurar = 'banana'

verificacoesPrevias(decisaoOcorrencia, trechoAProcurar);
const arquivosNome = await procurarArquivos();

let resultado;

if(decisaoOcorrencia == 'Um') {
    resultado = await lerArquivosUmaOcorrencia(arquivosNome, trechoAProcurar);
} else if(decisaoOcorrencia == 'Todos') {
    resultado = await lerArquivoTodasOcorrencias(arquivosNome, trechoAProcurar);
}

if(resultado !== undefined) {
    console.log(resultado);
} else {
    console.log('Não foi achado qualquer resultado')
}