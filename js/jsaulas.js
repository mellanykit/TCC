        const timeSelect = document.getElementById('timeSelect');
        const breathCircle = document.getElementById('breathCircle');
        const progressBar = document.getElementById('progressBar');
        const phases = ['Inspirar', 'Segurar', 'Expirar'];
        let isRunning = false, startTime = null, animationFrameId = null;
        let breathTime = +timeSelect.value, totalTime = breathTime * 3;
        const circumference = 2 * Math.PI * 90;

        function updateAnimation() {
            breathTime = +timeSelect.value;
            totalTime = breathTime * 3;
            breathCircle.style.animationDuration = `${totalTime}s`;
            progressBar.style.animationDuration = `${totalTime}s`;
            progressBar.style.strokeDasharray = circumference;
            progressBar.style.strokeDashoffset = circumference;
        }

        function updatePhase(t) {
            startTime = startTime || t;
            const elapsed = (t - startTime) / 1000;
            breathCircle.textContent = phases[Math.floor((elapsed % totalTime) / breathTime) % 3];
            if (isRunning) animationFrameId = requestAnimationFrame(updatePhase);
        }

        function startBreath() {
            if (!isRunning) {
                isRunning = true;
                breathCircle.style.animationPlayState = 'running';
                progressBar.style.animationPlayState = 'running';
                startTime = null;
                animationFrameId = requestAnimationFrame(updatePhase);
            }
        }

        function stopBreath() {
            if (isRunning) {
                isRunning = false;
                breathCircle.style.animationPlayState = 'paused';
                progressBar.style.animationPlayState = 'paused';
                cancelAnimationFrame(animationFrameId);
            }
        }

        function resetBreath() {
            stopBreath();
            breathCircle.style.animation = 'none';
            progressBar.style.animation = 'none';
            breathCircle.textContent = phases[0];
            startTime = null;
            setTimeout(() => {
                updateAnimation();
                breathCircle.style.animation = `breathe ${totalTime}s infinite paused`;
                progressBar.style.animation = `progress ${totalTime}s linear infinite paused`;
            }, 0);
        }

        timeSelect.addEventListener('change', resetBreath);
        updateAnimation();