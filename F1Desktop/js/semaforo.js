class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
        this.createStructure();
    }

    createStructure() {
        const main = document.querySelector('main');
        const header = document.createElement('h1');
        header.innerText = 'Juego del Semáforo';
        main.appendChild(header);

        const lightsContainer = document.createElement('div');
        lightsContainer.classList.add('lights-container');
        main.appendChild(lightsContainer);

        for (let i = 0; i < this.lights; i++) {
            const light = document.createElement('div');
            light.classList.add('light');
            lightsContainer.appendChild(light);
        }

        const buttonsContainer = document.createElement('div');
        main.appendChild(buttonsContainer);

        const startButton = document.createElement('button');
        startButton.innerText = 'Arranque';
        startButton.onclick = () => this.initSequence();
        buttonsContainer.appendChild(startButton);

        const reactButton = document.createElement('button');
        reactButton.innerText = 'Reacción';
        reactButton.disabled = true;
        reactButton.onclick = () => this.stopReaction();
        buttonsContainer.appendChild(reactButton);
    }

    initSequence() {
        document.querySelector('main').classList.add('load');
        document.querySelector('button').disabled = true;

        setTimeout(() => {
            this.unload_moment = new Date();
            document.querySelector('main').classList.add('unload');
            this.endSequence();
        }, 2000 + this.difficulty * 100);
    }

    endSequence() {
        document.querySelector('main').classList.remove('load');
        document.querySelector('main').classList.add('unload');
        const reactButton = document.querySelectorAll('button')[1];
        reactButton.disabled = false;
    }

    stopReaction() {
        this.clic_moment = new Date();
        const reactionTime = (this.clic_moment - this.unload_moment) / 1000;
        const roundedTime = reactionTime.toFixed(3);

        const resultPara = document.createElement('p');
        resultPara.innerText = `Tu tiempo de reacción es: ${roundedTime} segundos`;
        document.querySelector('main').appendChild(resultPara);

        document.querySelector('main').classList.remove('load');
        document.querySelector('main').classList.remove('unload');

        const startButton = document.querySelector('button');
        const reactButton = document.querySelectorAll('button')[1];
        startButton.disabled = false;
        reactButton.disabled = true;
    }
}

window.onload = () => new Semaforo();
