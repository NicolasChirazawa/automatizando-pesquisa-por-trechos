const { createQuestion, searchArchivesNames, lerArquivosUmaOcorrencia, lerArquivoTodasOcorrencias } = require('./estrutura.js');

function main () {
    let matchChoose;

    while (true) {
        console.log('[1]: Match único \n[2]: Match todas ocorrências \n');

        matchChoose = createQuestion('Qual match deseja?');
        if (matchChoose === '1' || matchChoose === '2') { break }

        console.clear();
        console.log('Escolha um match válido...');
    }

    while (true) {
        console.clear();

        const textForSearch = createQuestion('Escreva o trecho a procurar. \nLembre-se, e necessario informar corretamente espacos, acentuacoes e capitalizacoes. \n')

        console.clear();

        if (textForSearch === undefined || textForSearch === '') {
            console.log('É necessário passar um material para procurar.');
            continue
        }

        const archivesNames = searchArchivesNames();
        const searchResults = findArchiveMatch(archivesNames, textForSearch, matchChoose);

        if(searchResults !== undefined) {
            console.log(searchResults);
        } else {
            console.log('Não foi achado qualquer resultado.');
        }

        /*
        let repeticaoEscolha = readLineSync.keyInYN('\n Deseja parar?');

        if(repeticaoEscolha == true) {
            repeticaoProcura = false;
            break;
        } 
        */
        console.clear();
    }
}
main();