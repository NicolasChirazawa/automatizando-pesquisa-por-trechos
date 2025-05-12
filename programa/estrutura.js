const fs = require('fs');

function verificacoesPrevias(decisaoOcorrencia, trechoAProcurar) {

    if(decisaoOcorrencia != '1' && decisaoOcorrencia != '2') {
        console.log('É necessário decidir o modo de busca.');
        return;
    }

    if(trechoAProcurar == undefined && trechoAProcurar == '') {
        console.log('É necessário passar um material para procurar.');
        return;
    }
}

function procurarArquivos() {
    const caminho = "/../trechos-pesquisa/"

    const pesquisaDiretorio = fs.readdirSync(__dirname + caminho)
    return pesquisaDiretorio;
}

function lerArquivosUmaOcorrencia (nomeArquivos, trechoAProcurar) {

    const caminho = "/../trechos-pesquisa/";

    for(let i = 0; i < nomeArquivos.length; i++){
        let linhas;
        const texto = fs.readFileSync(__dirname + caminho + `/${nomeArquivos[i]}`, "utf8");
        linhas = texto.split('\r\n');
        const matchDescricao = procurarUmaOcorrencia(linhas, trechoAProcurar);

        if (matchDescricao !== undefined) {
            matchDescricao["arquivo"] = nomeArquivos[i];
            return matchDescricao;
        }
    }
}

function procurarUmaOcorrencia (linhas, trechoAProcurar) {
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


module.exports = { verificacoesPrevias, procurarArquivos, lerArquivosUmaOcorrencia, lerArquivoTodasOcorrencias }