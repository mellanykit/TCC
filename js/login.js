
function onChangeEmail() {
    toggleEmailErrors();
    toggleButtonsDisable();
    
}

function onChangePassword(){
    togglePasswordErrors();
    toggleButtonsDisable(); 
}

function login(){
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response =>{
         window.location.href = "index.html";
    }).catch(error=>{
        alert(getErrorMessage(error));
    });
}



function getErrorMessage(error){
    if(error.code == "auth/invalid-credential"){
        return "Usuário não encontrado!";
    }
    return error.message;
}



function isEmailValid(){

    const email = form.email().value;
    if(!email){
        return false;
    }
    return validateEmail(email);

}

function toggleEmailErrors(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none":"block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none":"block";
}

function togglePasswordErrors(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none":"block";

}

function toggleButtonsDisable(){
const emailValid = isEmailValid(); 
form.recoverpassword().disabled=!emailValid;

const passwordValid = isPasswordValid();
form.loginButton().disabled = !emailValid || !passwordValid;
   
}

function isPasswordValid(){

    const password = form.password().value;
    if(!password){
        return false;
    }
    return true;

}

const form = {
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverpassword: () => document.getElementById('recover-password-button')
}