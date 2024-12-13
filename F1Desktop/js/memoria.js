class Memoria {
    constructor() {
        this.elements = this.createElements();
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.shuffleElements();
        this.createGameBoard();
        this.addEventListeners();
    }

    createElements() {
        const elements = [
            { element: 'RedBull', source: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg' },
            { element: 'McLaren', source: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg' },
            { element: 'Alpine', source: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg' },
            { element: 'AstonMartin', source: 'https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg' },
            { element: 'Ferrari', source: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg' },
            { element: 'Mercedes', source: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg' }
        ];
        return elements.concat(elements); // Duplicate elements for pairs
    }

    shuffleElements() {
        this.elements = this.elements.sort(() => Math.random() - 0.5);
    }

    createGameBoard() {
        const board = document.querySelector('.memory-game'); // Seleccionar sección
        board.innerHTML = ''; // Limpiar tablero
        this.elements.forEach((item) => {
            // Crear nodo <article>
            const card = document.createElement('article');
            card.classList.add('memory-card');
            card.dataset.element = item.element; // Atributo data-element
    
            // Contenido del nodo
            card.innerHTML = `
                <h3>Tarjeta de memoria</h3> <!-- Visible inicialmente -->
                <img src="${item.source}" alt="${item.element}" /> <!-- Imagen oculta inicialmente -->
            `;
    
            // Añadir la tarjeta al tablero
            board.appendChild(card);
        });
    }
    

    addEventListeners() {
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => card.addEventListener('click', this.flipCard.bind(this, card)));
    }

    flipCard(card) {
        if (this.lockBoard || card === this.firstCard || card.dataset.state === 'revealed') return;

        card.classList.add('flip');
        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = card;
        } else {
            this.secondCard = card;
            this.checkForMatch();
        }
    }

    checkForMatch() {
        const isMatch = this.firstCard.dataset.element === this.secondCard.dataset.element;
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.dataset.state = 'revealed';
        this.secondCard.dataset.state = 'revealed';
        this.resetBoard();
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.classList.remove('flip');
            this.secondCard.classList.remove('flip');
            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }
}

document.addEventListener('DOMContentLoaded', () => new Memoria());
