import { carregarContatos, vetorContatos, acrescentarContato, excluirContato, salvarContatos } from "./agendaControl.js";

var inNome = document.getElementById("inNome");
var inEndereço = document.getElementById("inEndereço");
var inTelefone = document.getElementById("inTelefone");
var inCpf = document.getElementById("inCpf");
var inDtNascimento = document.getElementById("inDtNascimento");

var btOk = document.getElementById("btOk");

var outResultado = document.getElementById("outResultado");

var selectOpcao = document.getElementById("selectOpcao");

var sectionResultado = document.querySelector(".sectionResultado");

document.addEventListener("DOMContentLoaded", carregarContatos());

btOk.addEventListener("click", executarFunc);

selectOpcao.addEventListener("change", function () {
    let opcao = selectOpcao.value;

    if (opcao != "") {
        verificarOpcao(opcao);
    }
});

function verificarOpcao(opcao) {

    inDtNascimento.disabled = true;
    inDtNascimento.placeholder = "";
    inDtNascimento.value = "";
    inCpf.disabled = true;
    inCpf.placeholder = "";
    inCpf.value = "";
    inTelefone.disabled = true;
    inTelefone.placeholder = "";
    inTelefone.value = "";
    inEndereço.disabled = true;
    inEndereço.placeholder = "";
    inEndereço.value = "";
    inNome.disabled = true;
    inNome.placeholder = "";
    inNome.value = "";
    outResultado.textContent = "";
    sectionResultado.textContent = "";


    switch (opcao) {
        case "Cadastrar":
            inNome.disabled = false;
            inNome.placeholder = "Digite um nome";
            inEndereço.disabled = false;
            inEndereço.placeholder = "Digite o Endereço do Contato";
            inTelefone.disabled = false;
            inTelefone.placeholder = "(XX) XXXXX - XXXX";
            inCpf.disabled = false;
            inCpf.placeholder = "XXX.XXX.XXX - XX";
            inDtNascimento.disabled = false;
            inDtNascimento.placeholder = "XX/XX/XXXX";
            break;
        case "Excluir":
            inNome.disabled = false;
            inNome.placeholder = "Digite um nome";
            break;
        case "Alterar":
            inNome.disabled = false;
            inNome.placeholder = "Digite um produto";
            break;
        case "ConsultarDados":
            inEndereço.disabled = false;
            inEndereço.placeholder = "Digite um mês [1-6]";
            break;
        case "Listar":
            inEndereço.disabled = false;
            inEndereço.placeholder = "Digite um mês [1-6]";
    }
}

function executarFunc() {
    let opcao = selectOpcao.value;
    let descNome = (inNome.value);
    let descEndereco = (inEndereço.value);
    let descTelefone = Number(inTelefone.value);
    let descCpf = Number(inCpf.value);
    let dtNascimento = Number(inDtNascimento.value);

    switch (opcao) {
        case "Listar":
            let htmlTable = criarTableContatosHtml(vetorContatos());
            if (htmlTable != null) {
                sectionResultado.appendChild(htmlTable);
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro!";
                sectionResultado.innerHTML = "";
            }
            break;

        case "Cadastrar":
            if (descNome == "" && descEndereco == "" && descTelefone == "" && descCpf == "" && dtNascimento == "") {
                outResultado.style.color = "red";
                outResultado.textContent = "Para acrescentar Contato novo, o campo deve ser preenchido!";
                inNome.focus();
            } else {
                if (acrescentarContato(descNome, descEndereco, descTelefone, descCpf, dtNascimento) == true) {
                    outResultado.style.color = "blue";
                    outResultado.textContent = "O novo Contato foi acrescentado com sucesso!";

                    console.log(vetorContatos(), descCpf);
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! O Contato " + descNome + " já estava cadastrado!";
                    inNome.focus();
                }
            }
            break;

        case "Excluir":
            if (excluirContato(descNome) == true) {
                outResultado.style.color = "blue";
                outResultado.textContent = "O Contato foi excluido com sucesso!";
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! O Contato " + descNome + " não foi excluido!";
                inNome.focus();
            }
            break;

        case "Salvar":
            if (salvarContatos() == true) {
                outResultado.style.color = "blue";
                outResultado.textContent = "Sucesso ao Salvar Lista de Contatos!";
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! Contatos não Salvos no Arquivo!";;
            }
    }
}

function criarTableContatosHtml(vetContatos) {
    //esta function retorna null caso haja erro nos parâmetros
    //por exemplo: vetContato não tenha elementos ou tamanho
    // de vetVendas do produto e vetInfor não compatíveis.

    if (vetContatos.length > 0) {
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        // criando as colunas de preço, estoque e venda semestral
        var vetTableHead = ["Nome", "Endereço", "Telefone", "CPF", "Data de Nascimento"];
        for (let i = 0; i < vetTableHead.length; i++) {
            let th = document.createElement("th");
            th.textContent = vetTableHead[i];
            thead.appendChild(th);
        }

        table.appendChild(thead);

        for (let lin = 0; lin < vetContatos.length; lin++) {
            let tr = document.createElement("tr");

            let tdNome = document.createElement("td");
            tdNome.textContent = vetContatos[lin].name;

            let tdEndereco = document.createElement("td");
            tdEndereco.textContent = vetContatos[lin].address;

            let tdTelefone = document.createElement("td");
            tdTelefone.textContent = vetContatos[lin].phone;

            let tdCPF = document.createElement("td");
            tdCPF.textContent = vetContatos[lin].cpf;

            let tdDataNascimento = document.createElement("td");
            tdDataNascimento.textContent = vetContatos[lin].birthDay;

            tr.appendChild(tdNome);
            tr.appendChild(tdEndereco);
            tr.appendChild(tdTelefone);
            tr.appendChild(tdCPF);
            tr.appendChild(tdDataNascimento);

            tbody.appendChild(tr);

        }
        table.appendChild(tbody);

        return table;
    } else {
        return null;
    }
}
