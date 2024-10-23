const formularioAluno = document.getElementById('formulario-aluno');
const tabelaAlunos = document.getElementById('tabela-alunos').getElementsByTagName('tbody')[0];
let listaAlunos = [];

formularioAluno.addEventListener('submit', function(e) {
    e.preventDefault();
    const nomeAluno = document.getElementById('nome').value;
    const serieAluno = document.getElementById('serie').value;

    const aluno = { nome: nomeAluno, serie: serieAluno, presente: false };
    listaAlunos.push(aluno);

    atualizarTabela();
    formularioAluno.reset();
});

function atualizarTabela() {
    tabelaAlunos.innerHTML = '';
    listaAlunos.forEach((aluno, indice) => {
        const linha = tabelaAlunos.insertRow();

        const colunaNome = linha.insertCell(0);
        const colunaSerie = linha.insertCell(1);
        const colunaPresenca = linha.insertCell(2);
        const colunaAcoes = linha.insertCell(3);

        colunaNome.innerText = aluno.nome;
        colunaSerie.innerText = aluno.serie;

        colunaPresenca.classList.add('presenca');
        colunaPresenca.innerHTML = `
            <input type="checkbox" ${aluno.presente ? 'checked' : ''} onchange="marcarPresenca(${indice}, this)">
        `;

        colunaAcoes.innerHTML = `
            <button class="edit" onclick="editarAluno(${indice})">Editar</button>
            <button class="delete" onclick="deletarAluno(${indice})">Deletar</button>
        `;
    });
}

function marcarPresenca(indice, checkbox) {
    listaAlunos[indice].presente = checkbox.checked;
}

function editarAluno(indice) {
    const aluno = listaAlunos[indice];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('serie').value = aluno.serie;

    deletarAluno(indice);
}

function deletarAluno(indice) {
    listaAlunos.splice(indice, 1);
    atualizarTabela();
}