const fs = require('fs');
const readline = require('node:readline');

const { DIRECTORY } = require('./variables.js');

function createQuestion (text_question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const response = rl.question(text_question => { rl.close() });
    return response;
}

function searchArchivesNames() {
    const pesquisaDiretorio = fs.readdirSync(__dirname + DIRECTORY)
    return pesquisaDiretorio;
}

function findArchiveMatch (archivesNames, textForSearch, matchChoose) {
    let matchData;

    for (let i = 0; i < archivesNames.length; i++) {
        let lines;

        const archiveText = fs.readFileSync(__dirname + DIRECTORY + '/' + archivesNames[i], 'utf-8');
        lines = archiveText.split('\r\n');

        if (matchChoose === '1') {
            matchData = searchOccurrence(lines, textForSearch);
            if (matchData !== undefined) { return matchData };
        } else {
            matchData[]
        }
    }
    return matchData
}

function searchOccurrence (lines, textForSearch) {
    for(let i = 0; i < lines.length; i++){
        for(let j = 0; j < lines[i].length; j++){
            if (textForSearch.length + j > lines[i].length) { break };

            const textSearched = lines[i].slice(j, textForSearch.length + j);
            if (textSearched === trechoAProcurar) {
                const FIX_LINE_COUNT = 1;
                const response = {
                    numeroLinha:   i + FIX_LINE_COUNT, 
                    conteudoLinha: lines[i]
                }

                return response;
            }
        }
    }
    return undefined;
}

function lerArquivoTodasOcorrencias (nomeArquivos, trechoAProcurar) {

    const caminho = "/../trechos-pesquisa/";
    let produtoTodasOcorrencias = {};

    for(let i = 0; i < nomeArquivos.length; i++){
        let linhas;
        const texto = fs.readFileSync(__dirname + caminho + `/${nomeArquivos[i]}`, "utf8");
        linhas = texto.split('\r\n');
        const matchDescricao = procurarTodasOcorrencias(linhas, trechoAProcurar);

        if (matchDescricao !== undefined) {
            // matchDescricao["arquivo"] = nomeArquivos[i];
            produtoTodasOcorrencias[nomeArquivos[i]] = matchDescricao;
        }
    }

    return produtoTodasOcorrencias;
}

function procurarTodasOcorrencias (linhas, trechoAProcurar) {
    let todasOcorrencias = [];
    for(let i = 0; i < linhas.length; i++){
        let letrasMatch = 0;

        for(let j = 0; j < linhas[i].length; j++){
            if(linhas[i][j] == trechoAProcurar[letrasMatch]) { 
                letrasMatch++;
            }  else {
                
                if(letrasMatch > 0) { 
                    const arrumarCasoDuplicidadeLetra = 1
                    j -= arrumarCasoDuplicidadeLetra;
                }
                letrasMatch = 0;
            }
            
            if (trechoAProcurar.length == letrasMatch) {
                const arrumarNumeroLinhasArray = 1;
                todasOcorrencias.push({
                        numeroLinha:   i + arrumarNumeroLinhasArray, 
                        conteudoLinha: linhas[i]
                });
            }
        }
    }
    return todasOcorrencias;
}


module.exports = { createQuestion, searchArchivesNames, lerArquivosUmaOcorrencia, lerArquivoTodasOcorrencias }