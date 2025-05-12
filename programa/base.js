const { verificacoesPrevias, procurarArquivos, lerArquivosUmaOcorrencia, lerArquivoTodasOcorrencias } = require('./estrutura.js');
const readLineSync = require('readline-sync');

let escolhaInvalida = true;
let decisaoOcorrencia;

while (escolhaInvalida) {
    console.log('[1]: Match unico \n[2]: Match todas ocorrências \n');

    decisaoOcorrencia = readLineSync.question('Qual o match que deseja? \n')

    if(decisaoOcorrencia == '1') {
        escolhaInvalida = false;
        break;
    } else if (decisaoOcorrencia == '2') {
        escolhaInvalida = false;
        break;
    }

    console.clear();
    console.log('Insira um valor válido.');
}

let repeticaoProcura = true;

while(repeticaoProcura){
    console.clear();

    const trechoAProcurar = readLineSync.question('Escreva o trecho a procurar. \nLembre-se, e necessario informar corretamente espacos, acentuacoes e capitalizacoes. \n')

    console.clear();

    verificacoesPrevias(decisaoOcorrencia, trechoAProcurar);
    const arquivosNome = procurarArquivos();

    let resultado;

    if(decisaoOcorrencia == '1') {
        resultado = lerArquivosUmaOcorrencia(arquivosNome, trechoAProcurar);
    } else if(decisaoOcorrencia == '2') {
        resultado = lerArquivoTodasOcorrencias(arquivosNome, trechoAProcurar);
    }

    if(resultado !== undefined) {
        console.log(resultado);
    } else {
        console.log('Não foi achado qualquer resultado.');
    }

    console.log('\n Deseja parar?');

    let repeticaoEscolha = readLineSync.question('[1]: Parar / Qualquer outra coisa: Seguir \n');

    if(repeticaoEscolha == '1') {
        repeticaoProcura = false;
        break;
    } 

    console.clear();
}