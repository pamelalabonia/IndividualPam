var database = require("../database/config")

function listarCaixas(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = '';

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT Maquina, NumeroSerial, Cep FROM vwMaquina where Cnpj = '${cnpj}' GROUP BY NumeroSerial;
        `;
    }
    else if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT Maquina, NumeroSerial, Cep FROM vwMaquina where Cnpj = '74810893000177' 
        GROUP BY NumeroSerial, Maquina, Cep;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}

function selectCargo(query) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        ${query}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idUsuario, nome, login, cargo, fkEmpresa FROM tbUsuario WHERE login = '${email}' AND senha = '${senha}'
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarBanco(nomeBanco, emailBanco, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeBanco, emailBanco, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbEmpresa(cnpj, nome, email) VALUES ('${cnpj}','${nomeBanco}', '${emailBanco}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, cargo, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cargo, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbUsuario(nome, login, senha, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cargo}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMaquina(serialNumber, nome, cep, cnpj, cidade, regiao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", serialNumber, nome, cep, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbMaquina(serialNumber, fkEmpresa, nome, cep, cidade, regiao) VALUES ('${serialNumber}', '${cnpj}', '${nome}', '${cep}', '${cidade}', '${regiao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarComponente(serialNumber, tipo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarComponente():", serialNumber, tipo);

    if (tipo == "ram") {
        var instrucao = `
        INSERT INTO tbComponente(fkMaquina, tipo, metrica) VALUES ('${serialNumber}', '${tipo}', 'GB');
        `;
    }
    else if (tipo == "disco") {
        var instrucao = `
        INSERT INTO tbComponente(fkMaquina, tipo, metrica) VALUES ('${serialNumber}', '${tipo}', 'MB');
        `;
    }
    else {
        var instrucao = `
        INSERT INTO tbComponente(fkMaquina, tipo, metrica) VALUES ('${serialNumber}', '${tipo}', '%');
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarQuantidade() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarQuantidade():")
    var instrucao = `
        SELECT serialNumber AS 'qtd', regiao AS 'regiao' FROM tbMaquina;  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinasRegiao(query) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        ${query};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)

}

function listarComponentes(serialNumber) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarQuantidade():", serialNumber)
    var instrucao = `
        SELECT Componente FROM vwMaquina WHERE NumeroSerial = '${serialNumber}';  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarCeps() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarQuantidade():")
    var instrucao = `
        SELECT * FROM vwMaquina;  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrarBanco,
    cadastrarUsuario,
    cadastrarMaquina,
    cadastrarComponente,
    listarCaixas,
    selectCargo,
    listarQuantidade,
    listarMaquinasRegiao,
    listarComponentes,
    pegarCeps
};