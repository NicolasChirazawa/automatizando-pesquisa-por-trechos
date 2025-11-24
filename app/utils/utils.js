const fs = require('fs');
const readline = require('node:readline/promises');

const { DIRECTORY } = require('../variables.js');

async function createQuestion (text_question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const response = await 
        rl.question(`${text_question}\n\nInsira a resposta: `);
    
    rl.close();
    return response;
}

function searchArchivesNames () {
    const pesquisaDiretorio = fs.readdirSync(__dirname + DIRECTORY)
    return pesquisaDiretorio;
}

function matchResults (searchResults, textForSearch, matchChoose) {
    const dicionary = {
        '1': 'Uma ocorrência',
        '2': 'Demais decorrências'
    };

    const results = {
        'match_method': dicionary[matchChoose],
        'match_text': textForSearch,
        'archive': searchResults,
    }

    return results;
}

function findArchiveMatch (archivesNames, textForSearch, matchChoose) {
    let isMatchDataFind = false;
    let archives = {};
    let matchData;

    for (let i = 0; i < archivesNames.length; i++) {
        let lines;

        const archiveText = fs.readFileSync(__dirname + DIRECTORY + '/' + archivesNames[i], 'utf-8');
        lines = archiveText.split('\r\n');

        matchData = searchOccurrences(lines, textForSearch, matchChoose);
        if (matchData !== undefined) { 
            archives[archivesNames[i]] = matchData;
            isMatchDataFind = true; 
        };
        if (matchChoose === '1') { break };

    }
    
    if (!isMatchDataFind) { return undefined }
    return archives;
}

function searchOccurrences (lines, textForSearch, matchChoose) {
    let allOccurrences = [];
    
    for(let i = 0; i < lines.length; i++){
        for(let j = 0; j < lines[i].length; j++){

            if (textForSearch.length + j > lines[i].length) { break };
            const textSearched = lines[i].slice(j, textForSearch.length + j);

            if (textSearched === textForSearch) {
                const ARRAY_FIX_LINE_COUNT = 1;
                allOccurrences.push({
                    line_number:   i + ARRAY_FIX_LINE_COUNT, 
                    line_content: lines[i]
                });

                if (matchChoose === '1') { return allOccurrences }
            }
        }
    }
    return allOccurrences.length === 0 ? undefined : allOccurrences;
}

module.exports = { createQuestion, searchArchivesNames, findArchiveMatch, matchResults }