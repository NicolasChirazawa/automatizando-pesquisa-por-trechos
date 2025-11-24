const { createQuestion, searchArchivesNames, findArchiveMatch, matchResults } = require('./utils/utils.js');

async function main () {
    let matchChoose;

    while (true) {
        console.log('[1]: Match único \n[2]: Match todas ocorrências \n');

        matchChoose = await createQuestion('Qual match deseja?');
        if (matchChoose === '1' || matchChoose === '2') {  
            console.clear();
            break;
        }

        console.clear();
        console.log('Escolha um match válido... \n');
    }

    while (true) {
        const textForSearch = await createQuestion('Escreva o trecho a procurar. \nLembre-se, e necessario informar corretamente espacos, acentuacoes e capitalizacoes.');

        const archivesNames = searchArchivesNames();
        const searchResults = findArchiveMatch(archivesNames, textForSearch, matchChoose);

        console.log(searchResults);
        // console.clear();
        if(searchResults !== undefined) {
            const results = matchResults(searchResults, textForSearch, matchChoose)
            console.info(JSON.stringify(results, null, 2));
        } else {
            console.log('Não foi encontrado qualquer resultado.');
        }

        console.log('\n==============================================================')
        console.log('\n[1]: Parar \n[2]: Buscar novamente\n');
        const repeticaoEscolha = await createQuestion('Deseja prosseguir?');

        if (repeticaoEscolha === '1') { return } 
        console.clear();
    }
}
main();