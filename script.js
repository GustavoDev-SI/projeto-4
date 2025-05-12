const SUPABASE_URL_NOVO = 'https://sesnpxwhnzgexhdkachw.supabase.co'; // Altere aqui
const SUPABASE_ANON_KEY_NOVO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlc25weHdobnpnZXhoZGthY2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNTA4MzEsImV4cCI6MjA2MjYyNjgzMX0.ju5JUUn4iNF8GfYPo17TSSVjWw_OjqpYatdxIEL6xhQ'; // Altere aqui
const HEADERS_NOVO = {
    'apikey': SUPABASE_ANON_KEY_NOVO,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY_NOVO}`
};

const nomeInputNovo = document.getElementById('nomeInputNovo');
const idEdicaoNovo = document.getElementById('idEdicaoNovo');
const btnAcaoNovo = document.getElementById('btnAcaoNovo');
const listaNomesNovaUI = document.getElementById('listaNomesNova');

// Funções utilitárias para ícones
const criarIcone = (svgPath, className) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('class', `bi ${className}`);
    svg.setAttribute('viewBox', '0 0 16 16');
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', svgPath);
    svg.appendChild(path);
    return svg;
};

const iconeAdicionarNovo = criarIcone("M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2", "bi-plus-lg");
const iconeEditarNovo = criarIcone("M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z", "bi-pencil-square");
const iconeExcluirNovo = criarIcone("M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5", "bi-trash3-fill");
const iconeAtualizarNovo = criarIcone("M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z", "bi-check-lg");

async function carregarNomesNovo() {
    try {
        const resposta = await fetch(`${SUPABASE_URL_NOVO}/rest/v1/nomes?select=*&order=nome.asc`, { headers: HEADERS_NOVO });
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(`Erro ao carregar nomes: ${resposta.status} - ${erro.message}`);
        }
        const nomes = await resposta.json();
        exibirNomesNovo(nomes);
    } catch (erro) {
        console.error("Falha ao carregar nomes:", erro);
        alert("Não foi possível carregar a lista de nomes.");
    }
}

function exibirNomesNovo(nomes) {
    listaNomesNovaUI.innerHTML = '';
    nomes.forEach(nomeObj => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `<span>${nomeObj.nome}</span><div class="acoes"></div>`;
        const divAcoes = li.querySelector('.acoes');

        const btnEditar = document.createElement('button');
        btnEditar.className = 'btn btn-sm btn-warning btn-editar';
        btnEditar.appendChild(iconeEditarNovo.cloneNode(true));
        btnEditar.addEventListener('click', () => prepararEdicaoNovo(nomeObj.id, nomeObj.nome));

        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'btn btn-sm btn-danger btn-excluir';
        btnExcluir.appendChild(iconeExcluirNovo.cloneNode(true));
        btnExcluir.addEventListener('click', () => removerNomeNovo(nomeObj.id));

        divAcoes.appendChild(btnEditar);
        divAcoes.appendChild(btnExcluir);
        listaNomesNovaUI.appendChild(li);
    });
}

function prepararEdicaoNovo(id, nome) {
    nomeInputNovo.value = nome;
    idEdicaoNovo.value = id;
    btnAcaoNovo.innerHTML = '';
    btnAcaoNovo.appendChild(iconeAtualizarNovo.cloneNode(true));
    btnAcaoNovo.appendChild(document.createTextNode(' Atualizar'));
    btnAcaoNovo.classList.remove('btn-primary');
    btnAcaoNovo.classList.add('btn-success');
    nomeInputNovo.focus();
}

function resetarFormularioNovo() {
    nomeInputNovo.value = '';
    idEdicaoNovo.value = '';
    btnAcaoNovo.innerHTML = '';
    btnAcaoNovo.appendChild(iconeAdicionarNovo.cloneNode(true));
    btnAcaoNovo.appendChild(document.createTextNode(' Adicionar'));
    btnAcaoNovo.classList.remove('btn-success');
    btnAcaoNovo.classList.add('btn-primary');
}

async function salvarNomeNovo() {
    const nome = nomeInputNovo.value.trim();
    if (!nome) {
        alert('Por favor, digite um nome.');
        return;
    }

    try {
        const resposta = await fetch(`${SUPABASE_URL_NOVO}/rest/v1/nomes`, {
            method: 'POST',
            headers: HEADERS_NOVO,
            body: JSON.stringify({ nome })
        });
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(`Erro ao salvar nome: ${resposta.status} - ${erro.message}`);
        }
        resetarFormularioNovo();
        carregarNomesNovo();
    } catch (erro) {
        console.error("Falha ao salvar nome:", erro);
        alert("Não foi possível salvar o nome.");
    }
}

async function atualizarNomeNovo() {
    const nome = nomeInputNovo.value.trim();
    const id = idEdicaoNovo.value;
    if (!nome) {
        alert('Por favor, digite um nome.');
        return;
    }
    if (!id) {
        console.error("ID para edição não encontrado.");
        alert("Erro interno: ID para edição não encontrado.");
        return;
    }

    try {
        const resposta = await fetch(`${SUPABASE_URL_NOVO}/rest/v1/nomes?id=eq.${id}`, {
            method: 'PATCH',
            headers: HEADERS_NOVO,
            body: JSON.stringify({ nome })
        });
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(`Erro ao atualizar nome: ${resposta.status} - ${erro.message}`);
        }
        resetarFormularioNovo();
        carregarNomesNovo();
    } catch (erro) {
        console.error("Falha ao atualizar nome:", erro);
        alert("Não foi possível atualizar o nome.");
    }
}

async function salvarOuAtualizarNomeNovo() {
    if (idEdicaoNovo.value) {
        await atualizarNomeNovo();
    } else {
        await salvarNomeNovo();
    }
}

async function removerNomeNovo(id) {
    if (!confirm('Tem certeza que deseja excluir este nome?')) {
        return;
    }
    try {
        const resposta = await fetch(`${SUPABASE_URL_NOVO}/rest/v1/nomes?id=eq.${id}`, {
            method: 'DELETE',
            headers: HEADERS_NOVO
        });
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(`Erro ao excluir nome: ${resposta.status} - ${erro.message}`);
        }
        resetarFormularioNovo();
        carregarNomesNovo();
    } catch (erro) {
        console.error("Falha ao excluir nome:", erro);
        alert("Não foi possível excluir o nome.");
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', carregarNomesNovo);
btnAcaoNovo.addEventListener('click', salvarOuAtualizarNomeNovo);