// === VALIDAÇÃO DE E-MAIL ===
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// === FUNÇÕES DO FORMULÁRIO ===
function onChangeEmail() {
    toggleEmailErrors();
    toggleButtonsDisable();
}

function onChangePassword() {
    togglePasswordErrors();
    toggleButtonsDisable();
}

// === LOGIN ===
function login() {
    showLoading(); // se tiver loading.js

    firebase.auth().signInWithEmailAndPassword(
        form.email().value,
        form.password().value 

    ).then(response => {
        hideLoading();
        window.location.href = "index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
        return "E-mail ou senha incorretos.";
    }
    if (error.code === "auth/wrong-password") {
        return "Senha incorreta.";
    }
    return error.message;
}

// === RECUPERAR SENHA (CORRIGIDA E INTEGRADA) ===
function recoverPassword() {
   firebase.auth().sendPasswordResetEmail(form.email().value).then(()=> {
    alert('Email enviado com sucesso');
   }).catch(error=>{
    alert(getErrorMessage(error));
   });
}

// === VALIDAÇÕES VISUAIS ===
function isEmailValid() {
    const email = form.email().value;
    if (!email) return false;
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value.length > 0;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    form.recoverpassword().disabled = !emailValid;
    form.loginButton().disabled = !emailValid || !passwordValid;
}

// === OBJETO FORM (mantido) ===
const form = {
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverpassword: () => document.getElementById('recover-password-button')
};

// === FUNÇÕES DE LOADING (se existirem) ===
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'block';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}