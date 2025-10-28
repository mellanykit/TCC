document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('zenMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Configurar canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Web Audio API
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Controle de Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸ Pausar';
            if (audioCtx.state === 'suspended') audioCtx.resume();
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶️ Tocar';
        }
    });

    // Controle de Volume
    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100;
        audio.volume = volume;
        volumeValue.textContent = `${volumeSlider.value}%`;
    });

    // Visualizador de ondas
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * canvas.height * 0.7;

            const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
            gradient.addColorStop(0, '#fdbb2d');
            gradient.addColorStop(0.5, '#b21f1f');
            gradient.addColorStop(1, '#1a2a6c');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    draw();

    // Iniciar com volume médio
    audio.volume = 0.5;
});