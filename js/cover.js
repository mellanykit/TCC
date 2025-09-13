// Função para a sidebar (mantida)
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Função para a página de covers
document.addEventListener('DOMContentLoaded', () => {
  const videoForm = document.getElementById('video-form');
  const videoGallery = document.getElementById('video-gallery');
  const videoUrlInput = document.getElementById('video-url');
  const videoTitleInput = document.getElementById('video-title');

  // Função para converter URL do YouTube em URL de embed
  function getYouTubeEmbedUrl(url) {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  }

  // Carrega vídeos salvos (simulação com localStorage)
  const savedVideos = JSON.parse(localStorage.getItem('covers') || '[]');
  savedVideos.forEach(video => {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.innerHTML = `
      <h5>${video.title}</h5>
      <iframe width="100%" height="200" src="${video.embedUrl}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
    videoGallery.appendChild(videoItem);
  });

  // Manipula o envio do formulário
  videoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = videoUrlInput.value;
    const title = videoTitleInput.value;
    const embedUrl = getYouTubeEmbedUrl(url);

    if (!embedUrl) {
      alert('Por favor, insira um link válido do YouTube.');
      return;
    }

    // Adiciona o vídeo à galeria
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.innerHTML = `
      <h5>${title}</h5>
      <iframe width="100%" height="200" src="${embedUrl}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
    videoGallery.appendChild(videoItem);

    // Salva no localStorage (simulação de backend)
    savedVideos.push({ title, embedUrl });
    localStorage.setItem('covers', JSON.stringify(savedVideos));

    // Limpa o formulário
    videoForm.reset();
  });
});
