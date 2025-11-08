document.addEventListener('DOMContentLoaded', () => {

    const links = document.querySelectorAll('nav a');
    const newsSection = document.querySelector('.news-section');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        
        e.preventDefault();
        const text = link.textContent;
        if(text === 'Login') {
          window.location.href = 'login.html';
        } else if(text === 'Sobre o site') {
          window.location.href = 'sobreoSite.html';
        } else if(text === 'Sobre as Criadoras') {
          window.location.href = 'programadoras.html';
        } else if(text === 'Cadastro') {
            window.location.href = 'cadastro.html';
        }else {
          updateContent('Conteúdo não disponível');
        }
      })

        const sidebar = document.getElementById('sidebar');
        const menuIcon = document.querySelector('.menu-icon');
        const closeBtn = document.querySelector('.close-btn');
      
        if (menuIcon) {
          menuIcon.addEventListener('click', () => {
            sidebar.classList.add('open');
          });
        }
      
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
          });
        }
    
    })

})

function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}

firebase.auth().onAuthStateChanged(user => {
  const logout = document.getElementById('logout');

  if (user) {
    // Usuário logado → mostra o botão
    logout.style.display = 'inline-block';
  } else {
    // Usuário não logado → esconde o botão
    logout.style.display = 'none';
  }
});