// Substitua 'YOUR_API_KEY' pela sua chave de API do YouTube
const API_KEY = 'AIzaSyDE-IkbS6M0tDMKHcI29VKWIyKk8yMooUA';
// Substitua 'PLAYLIST_ID' pelo ID da playlist desejada
const PLAYLIST_ID = 'PLDE_lgCyeyihL4wnuNRuF5_gHIfv5l6A7&si=lGnLhCITKxILeqYk'; // Exemplo: 'PL1234567890'

async function fetchYouTubeVideos() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
    );
    const data = await response.json();
    if (data.items) {
      displayVideos(data.items);
    } else {
      document.getElementById('video-list').innerHTML = '<p>Não foram encontrados vídeos.</p>';
    }
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    document.getElementById('video-list').innerHTML = '<p>Erro ao carregar vídeos.</p>';
  }
}

function displayVideos(videos) {
  const videoList = document.getElementById('video-list');
  videoList.innerHTML = ''; // Limpa o contêiner
  videos.forEach((item) => {
    const videoId = item.snippet.resourceId.videoId;
    const title = item.snippet.title;
    const videoElement = document.createElement('div');
    videoElement.classList.add('video-item');
    videoElement.innerHTML = `
      <h3>${title}</h3>
      <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" allowfullscreen></iframe>
    `;
    videoList.appendChild(videoElement);
  });
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchYouTubeVideos);