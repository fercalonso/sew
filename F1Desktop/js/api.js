class PitStopSimulator {
    constructor() {
        this.main = document.querySelector('main');
        this.tiresPlaced = 0;
        this.startTime = null;
        this.audioSrc = 'multimedia/audios/pitstop.mp3';
        this.init();
    }

    init() {
        this.createParagraph();
        this.createAudio();
        this.createSections();
        this.handleResize();

        // Agregar eventos de orientación y tamaño de la pantalla
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('online', this.updateOnlineStatus.bind(this));
        window.addEventListener('offline', this.updateOnlineStatus.bind(this));

        // Inicializar el estado de la red
        this.updateOnlineStatus();
    }

    createParagraph() {
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Arrastra y suelta las herramientas y neumáticos en el área de pit stop.';
        this.main.appendChild(paragraph);
    }

    createAudio() {
        this.audio = document.createElement('audio');
        this.audio.src = this.audioSrc;
        this.main.appendChild(this.audio);
    }

    createSections() {
        this.createSection1();
        this.createSection2();
    }

    createSection1() {
        const section1 = document.createElement('section');

        const toolArticle = document.createElement('article');
        const toolButton = document.createElement('button');
        const imgTool = document.createElement('img');
        imgTool.src = 'multimedia/imagenes/herramienta.png';
        imgTool.alt = 'Herramienta de f1';
        imgTool.style.width = '50px';
        imgTool.style.height = '50px';
        toolButton.appendChild(imgTool);
        toolButton.style.display = 'none';
        toolButton.addEventListener('click', this.showTimeMarker.bind(this));
        toolArticle.appendChild(toolButton);
        section1.appendChild(toolArticle);

        const article2 = this.createDraggableArticle('multimedia/imagenes/neumatico.webp', 'Neumatico de f1');
        section1.appendChild(article2);

        this.toolButton = toolButton;

        this.main.appendChild(section1);
    }

    createSection2() {
        this.section2 = document.createElement('section');

        for (let i = 0; i < 4; i++) {
            const article = document.createElement('article');
            article.addEventListener('dragover', this.handleDragOver.bind(this));
            article.addEventListener('drop', this.handleDrop.bind(this));
            this.section2.appendChild(article);
        }

        this.main.appendChild(this.section2);
    }

    createDraggableArticle(imgSrc, altText) {
        const article = document.createElement('article');
        article.setAttribute('draggable', 'true');
        article.addEventListener('dragstart', this.handleDragStart.bind(this));

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = altText;
        article.appendChild(img);

        return article;
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.src);
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        event.preventDefault();
        const imageSrc = event.dataTransfer.getData('text/plain');
        if (imageSrc.includes('neumatico.webp')) {
            if (!this.startTime) {
                this.startTime = new Date().getTime();
            }
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = 'Neumatico de f1';
            img.style.width = '100%';
            img.style.height = '100%';
            event.target.appendChild(img);
            this.audio.play();
            this.tiresPlaced++;
            this.checkAllTiresPlaced();
        }
    }

    checkAllTiresPlaced() {
        if (this.tiresPlaced === 4) {
            document.querySelectorAll('article[draggable="true"]').forEach(article => {
                article.removeAttribute('draggable');
            });
            console.log('Todos los neumáticos han sido colocados. Herramienta disponible.');
            this.toolButton.style.display = 'block';
        }
    }

    showTimeMarker() {
        if (this.tiresPlaced === 4) {
            const endTime = new Date().getTime();
            const timeTaken = (endTime - this.startTime) / 1000; // Tiempo en segundos
            const timeMarker = document.createElement('p');
            timeMarker.textContent = `Tiempo transcurrido: ${timeTaken} segundos`;
            this.main.appendChild(timeMarker);
            this.toolButton.style.display = 'none'; // Ocultar botón después de mostrar el marcador de tiempo
        }
    }

    handleResize() {
        const isLandscape = window.innerWidth > window.innerHeight;
        if (isLandscape) {
            this.section2.style.width = '80%';
            this.section2.style.height = '1000px';
        } else {
            this.section2.style.width = '100%';
            this.section2.style.height = '600px';
        }
    }

    updateOnlineStatus() {
        const condition = navigator.onLine ? "online" : "offline";
        console.log(`Estado de la red: ${condition}`);

        if (condition === "offline") {
            this.loadOfflineContent();
        } else {
            this.saveOnlineContent();
        }
    }

    saveOnlineContent() {
        const paragraph = 'Arrastra y suelta las herramientas y neumáticos en el área de pit stop.';
        localStorage.setItem('paragraph', paragraph);

        const img1Src = 'multimedia/imagenes/herramienta.png';
        localStorage.setItem('img1Src', img1Src);

        const img2Src = 'multimedia/imagenes/neumatico.webp';
        localStorage.setItem('img2Src', img2Src);

        localStorage.setItem('audioSrc', this.audioSrc);
    }

    loadOfflineContent() {
        const paragraphText = localStorage.getItem('paragraph') || 'Contenido offline no disponible';
        const paragraph = document.createElement('p');
        paragraph.textContent = paragraphText;
        this.main.appendChild(paragraph);

        const audio = document.createElement('audio');
        audio.src = localStorage.getItem('audioSrc') || '';
        this.main.appendChild(audio);

        const section1 = document.createElement('section');

        const toolArticle = document.createElement('article');
        const toolButton = document.createElement('button');
        const imgTool = document.createElement('img');
        imgTool.src = 'multimedia/imagenes/herramienta.png';
        imgTool.alt = 'Herramienta de f1';
        imgTool.style.width = '100%';
        imgTool.style.height = '100%';
        toolButton.appendChild(imgTool);
        toolButton.style.display = 'none';
        toolButton.addEventListener('click', this.showTimeMarker.bind(this));
        toolArticle.appendChild(toolButton);
        section1.appendChild(toolArticle);

        const article2 = document.createElement('article');
        article2.setAttribute('draggable', 'true');
        const img2 = document.createElement('img');
        img2.src = localStorage.getItem('img2Src') || '';
        img2.alt = 'Neumatico de f1';
        article2.appendChild(img2);
        section1.appendChild(article2);

        this.toolButton = toolButton;

        this.main.appendChild(section1);

        const section2 = document.createElement('section');
        for (let i = 0; i < 4; i++) {
            const article = document.createElement('article');
            article.addEventListener('dragover', this.handleDragOver.bind(this));
            article.addEventListener('drop', this.handleDrop.bind(this));
            section2.appendChild(article);
        }
        this.main.appendChild(section2);
    }
}

window.onload = () => new PitStopSimulator();
