// ========================================
// DADOS
// ========================================

let movimentacoes = [];


// ========================================
// ELEMENTOS DO HTML
// ========================================

const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoInput = document.getElementById("tipo");

const btnAdicionar = document.getElementById("btnAdicionar");

const listaMovimentacoes = document.getElementById(
    "listaMovimentacoes"
);

const mensagemVazia = document.getElementById(
    "mensagemVazia"
);

const totalReceitasElement = document.getElementById(
    "totalReceitas"
);

const totalDespesasElement = document.getElementById(
    "totalDespesas"
);

const saldoElement = document.getElementById(
    "saldo"
);


// ========================================
// FORMATADOR DE MOEDA
// ========================================

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});


// ========================================
// ADICIONAR MOVIMENTAÇÃO
// ========================================

function adicionarMovimentacao() {

    const descricao = descricaoInput.value.trim();
    const valor = Number(valorInput.value);
    const tipo = tipoInput.value;


    // Validação

    if (descricao === "") {
        alert("Digite uma descrição.");
        descricaoInput.focus();
        return;
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor maior que zero.");
        valorInput.focus();
        return;
    }


    // Criação da movimentação

    const movimentacao = {
        id: Date.now(),
        descricao: descricao,
        valor: valor,
        tipo: tipo
    };


    // Adiciona ao array

    movimentacoes.push(movimentacao);


    // Limpa os campos

    descricaoInput.value = "";
    valorInput.value = "";

    descricaoInput.focus();


    // Atualiza a tela

    atualizarTela();
}


// ========================================
// ATUALIZAR TELA
// ========================================

function atualizarTela() {

    // Limpa a lista atual

    listaMovimentacoes.innerHTML = "";


    // Totais

    let totalReceitas = 0;
    let totalDespesas = 0;


    // Verifica se existem movimentações

    if (movimentacoes.length === 0) {

        mensagemVazia.style.display = "block";

    } else {

        mensagemVazia.style.display = "none";
    }


    // Percorre as movimentações

    movimentacoes.forEach(function(movimentacao) {

        // Cria o item da lista

        const item = document.createElement("li");


        // Cria descrição

        const descricao = document.createElement("span");

        descricao.classList.add(
            "descricao-movimentacao"
        );

        descricao.textContent = movimentacao.descricao;


        // Cria valor

        const valor = document.createElement("span");

        valor.classList.add(
            "valor-movimentacao",
            movimentacao.tipo
        );

        valor.textContent =
            formatarMoeda.format(movimentacao.valor);


        // Cria botão excluir

        const botaoExcluir = document.createElement("button");

        botaoExcluir.type = "button";

        botaoExcluir.classList.add("btn-excluir");

        botaoExcluir.textContent = "Excluir";


        // Evento do botão

        botaoExcluir.addEventListener(
            "click",
            function() {

                removerMovimentacao(
                    movimentacao.id
                );

            }
        );


        // Adiciona os elementos ao item

        item.appendChild(descricao);
        item.appendChild(valor);
        item.appendChild(botaoExcluir);


        // Adiciona o item à lista

        listaMovimentacoes.appendChild(item);


        // Calcula os totais

        if (movimentacao.tipo === "receita") {

            totalReceitas += movimentacao.valor;

        } else {

            totalDespesas += movimentacao.valor;
        }

    });


    // Calcula o saldo

    const saldo = totalReceitas - totalDespesas;


    // Atualiza os valores na tela

    totalReceitasElement.textContent =
        formatarMoeda.format(totalReceitas);

    totalDespesasElement.textContent =
        formatarMoeda.format(totalDespesas);

    saldoElement.textContent =
        formatarMoeda.format(saldo);
}


// ========================================
// REMOVER MOVIMENTAÇÃO
// ========================================

function removerMovimentacao(id) {

    movimentacoes = movimentacoes.filter(
        function(movimentacao) {

            return movimentacao.id !== id;

        }
    );


    // Atualiza a tela

    atualizarTela();
}


// ========================================
// EVENTO DO BOTÃO ADICIONAR
// ========================================

btnAdicionar.addEventListener(
    "click",
    adicionarMovimentacao
);


// ========================================
// PERMITIR ENTER PARA ADICIONAR
// ========================================

descricaoInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            adicionarMovimentacao();
        }

    }
);


valorInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            adicionarMovimentacao();
        }

    }
);


// ========================================
// INICIALIZAÇÃO
// ========================================

atualizarTela();