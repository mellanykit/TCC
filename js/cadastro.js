firebase.auth().onAuthStateChanged(function(user){
    if (user){
        window.location.href = "index.html"
    }
})

// === VALIDAÇÃO DE E-MAIL ===
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// === VALIDAÇÃO DE IDADE (13+ anos) ===
function isAgeValid(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 13;
}

// === FUNÇÕES DE MUDANÇA ===
function onChangeNome() { toggleNomeErrors(); toggleButton(); }
function onChangeDataNasc() { toggleDataErrors(); toggleButton(); }
function onChangeEmail() { toggleEmailErrors(); toggleButton(); }
function onChangeSenha() { toggleSenhaErrors(); toggleButton(); }
function onChangeConfirmarSenha() { toggleConfirmarSenhaErrors(); toggleButton(); }

// === CADASTRO ===
function cadastrar(e) {
    e.preventDefault();
    showLoading();

    const email = form.email().value;
    const senha = form.senha().value;

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() => {
            hideLoading();
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}

function getErrorMessage(error) {
    if (error.code === "auth/email-already-in-use") return "Este e-mail já está cadastrado.";
    if (error.code === "auth/weak-password") return "Senha muito fraca.";
    if (error.code === "auth/invalid-email") return "E-mail inválido.";
    return error.message;
}

// === VALIDAÇÕES VISUAIS ===
function toggleNomeErrors() {
    const nome = form.nome().value.trim();
    form.nomeRequiredError().style.display = nome ? "none" : "block";
}

function toggleDataErrors() {
    const data = form.dataNasc().value;
    form.dataRequiredError().style.display = data ? "none" : "block";
    form.dataInvalidError().style.display = (data && isAgeValid(data)) ? "none" : "block";
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function toggleSenhaErrors() {
    const senha = form.senha().value;
    form.senhaRequiredError().style.display = senha ? "none" : "block";
    form.senhaLengthError().style.display = (senha.length >= 6) ? "none" : "block";
}

function toggleConfirmarSenhaErrors() {
    const senha = form.senha().value;
    const confirmar = form.confirmarSenha().value;
    form.confirmarRequiredError().style.display = confirmar ? "none" : "block";
    form.senhaMismatchError().style.display = (senha === confirmar && confirmar) ? "none" : "block";
}

function toggleButton() {
    const nome = form.nome().value.trim();
    const data = form.dataNasc().value && isAgeValid(form.dataNasc().value);
    const email = validateEmail(form.email().value);
    const senha = form.senha().value.length >= 6;
    const confirmar = form.senha().value === form.confirmarSenha().value && form.confirmarSenha().value;

    form.cadastroButton().disabled = !(nome && data && email && senha && confirmar);
}

// === OBJETO FORM ===
const form = {
    nome: () => document.getElementById('nome'),
    nomeRequiredError: () => document.getElementById('nome-required-error'),
    dataNasc: () => document.getElementById('dataNasc'),
    dataRequiredError: () => document.getElementById('data-required-error'),
    dataInvalidError: () => document.getElementById('data-invalid-error'),
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    senha: () => document.getElementById('senha'),
    senhaRequiredError: () => document.getElementById('senha-required-error'),
    senhaLengthError: () => document.getElementById('senha-length-error'),
    confirmarSenha: () => document.getElementById('confirmarSenha'),
    confirmarRequiredError: () => document.getElementById('confirmar-required-error'),
    senhaMismatchError: () => document.getElementById('senha-mismatch-error'),
    cadastroButton: () => document.getElementById('cadastro-button')
};

// === LOADING (se tiver loading.js) ===
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'block';
}
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}
