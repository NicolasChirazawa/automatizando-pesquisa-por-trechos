import * as fs from 'node:fs/promises';
import path from 'path';

const __dirname = path.resolve();

function verificacoesPrevias(decisaoOcorrencia, trechoAProcurar) {

    if(decisaoOcorrencia != 'Um' && decisaoOcorrencia != 'Todos') {
        console.log('É necessário decidir o modo de busca.');
        return;
    }

    if(trechoAProcurar == undefined && trechoAProcurar == '') {
        console.log( 'É necessário passar um material para procurar.');
        return;
    }
}

async function procurarArquivos() {
    const caminho = "/trechos-pesquisa/";

    const pesquisaDiretorio = await fs.readdir(__dirname + caminho);
    return pesquisaDiretorio;
}

async function lerArquivos (decisaoOcorrencia, nomeArquivos, trechoAProcurar) {
    if(decisaoOcorrencia == 'Um') {
        const caminho = "/trechos-pesquisa/";

        for(let i = 0; i < nomeArquivos.length; i++){
            let linhas;
            const texto = await fs.readFile(__dirname + caminho + `/${nomeArquivos[i]}`, "utf8");
            linhas = texto.split('\r\n');
            const matchDescricao = await procurarUmaOcorrencia(linhas, trechoAProcurar);

            if (matchDescricao != undefined) {
                matchDescricao["arquivo"] = nomeArquivos[i];
                console.log(matchDescricao);
                break;
            } else if (nomeArquivos.length == i + 1) {
                console.log('Erro');
            }
        }
    } else {

    }
}

async function procurarUmaOcorrencia (linhas, trechoAProcurar) {
    for(let i = 0; i < linhas.length; i++){
        let letrasMatch = 0;

        for(let j = 0; j < linhas[i].length; j++){
            
            if(linhas[i].length - j < trechoAProcurar) { break }

            if(linhas[i][j] == trechoAProcurar[letrasMatch]) { 
                letrasMatch++;
            }  else {
                letrasMatch = 0;
            }
            
            if (trechoAProcurar.length == letrasMatch) {
                return ({
                        numeroLinha:   i, 
                        conteudoLinha: linhas[i]
                    }) ;
            }
        }
    }
}

async function procurarTodasOcorrencias (linhas, trechoAProcurar) {
    for(let i = 0; i < linhas.length; i++){
        let letrasMatch = 0;

        for(let j = 0; j < linhas[i].length; j++){
            
            if(linhas[i].length - j < trechoAProcurar) { break }

            if(linhas[i][j] == trechoAProcurar[letrasMatch]) { 
                console.log(linhas[i][j])
                letrasMatch++;
            }  else {
                letrasMatch = 0;
            }
            
            if (trechoAProcurar.length == letrasMatch) {
                return ({
                        numeroLinha:   i, 
                        conteudoLinha: linhas[i]
                    }) ;
            }
        }
    }
}

const decisaoOcorrencia = 'Um';
const trechoAProcurar = 'banana'

verificacoesPrevias(decisaoOcorrencia, trechoAProcurar);
const arquivosNome = await procurarArquivos();
await lerArquivos(decisaoOcorrencia, arquivosNome, trechoAProcurar);