const form = document.getElementById('form');
const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const buttonLimpar = document.getElementById('btn-limpar');

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

cep.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }

    cep.value = value.substring(0, 9); 
});

// Função para realizar a busca na API
const buscarCep = async () => {
    const cepValue = cep.value.replace(/\D/g, '');

    if (cepValue.length !== 8) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        return;
    }

    rua.value = "Carregando...";
    bairro.value = "Carregando...";
    cidade.value = "Carregando...";
    uf.value = "Carregando...";

    try {
        const response = await fetch(`https://opencep.com/v1/${cepValue}.json`);

        if (!response.ok) {
            throw new Error("CEP não encontrado");
        }

        const cepData = await response.json();

        rua.value = cepData.logradouro || "";
        bairro.value = cepData.bairro || "";
        cidade.value = cepData.localidade || "";
        uf.value = cepData.uf || "";

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao buscar o CEP. Verifique se ele está correto.");

        rua.value = "";
        bairro.value = "";
        cidade.value = "";
        uf.value = "";
    }
};

// Chama a função ao perder o foco (blur)
cep.addEventListener('blur', buscarCep);

// Chama a função ao pressionar Enter
cep.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        buscarCep();
    }
});

buttonLimpar.addEventListener('click', () => {
    cep.value = "";
    rua.value = "";
    bairro.value = "";
    cidade.value = "";
    uf.value = "";
});
