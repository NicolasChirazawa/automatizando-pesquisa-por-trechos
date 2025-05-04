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

async function lerArquivosUmaOcorrencia (nomeArquivos, trechoAProcurar) {

    const caminho = "/trechos-pesquisa/";

    for(let i = 0; i < nomeArquivos.length; i++){
        let linhas;
        const texto = await fs.readFile(__dirname + caminho + `/${nomeArquivos[i]}`, "utf8");
        linhas = texto.split('\r\n');
        const matchDescricao = await procurarUmaOcorrencia(linhas, trechoAProcurar);

        if (matchDescricao !== undefined) {
            matchDescricao["arquivo"] = nomeArquivos[i];
            return matchDescricao;
        }
    }
}

async function procurarUmaOcorrencia (linhas, trechoAProcurar) {
    for(let i = 0; i < linhas.length; i++){
        let letrasMatch = 0;

        for(let j = 0; j < linhas[i].length; j++){
            
            // Caso para diminuir a quantidade de loops desnecessários. Quantidade de caracteres do match maior que a frase mais o andamento do loop.
            if(linhas[i].length - j < trechoAProcurar) { break }

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
                return ({
                        numeroLinha:   i + arrumarNumeroLinhasArray, 
                        conteudoLinha: linhas[i]
                });
            }
        }
    }
}

async function lerArquivoTodasOcorrencias (nomeArquivos, trechoAProcurar) {

    const caminho = "/trechos-pesquisa/";
    let produtoTodasOcorrencias = {};

    for(let i = 0; i < nomeArquivos.length; i++){
        let linhas;
        const texto = await fs.readFile(__dirname + caminho + `/${nomeArquivos[i]}`, "utf8");
        linhas = texto.split('\r\n');
        const matchDescricao = await procurarTodasOcorrencias(linhas, trechoAProcurar);

        if (matchDescricao !== undefined) {
            // matchDescricao["arquivo"] = nomeArquivos[i];
            produtoTodasOcorrencias[nomeArquivos[i]] = matchDescricao;
        }
    }

    return produtoTodasOcorrencias;
}

async function procurarTodasOcorrencias (linhas, trechoAProcurar) {
    let todasOcorrencias = [];
    for(let i = 0; i < linhas.length; i++){
        let letrasMatch = 0;

        for(let j = 0; j < linhas[i].length; j++){
            
            // Caso para diminuir a quantidade de loops desnecessários. Quantidade de caracteres do match maior que a frase mais o andamento do loop.
            if(linhas[i].length - j < trechoAProcurar) { break }

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

const decisaoOcorrencia = 'Todos';
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