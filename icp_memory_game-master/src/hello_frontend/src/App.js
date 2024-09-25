import { html, render } from 'lit-html';
import { hello_backend } from 'declarations/hello_backend';
import './App.css';

class App {
  cards = [];
  matchedPairs = 0;
  activeCards = [];

  constructor() {
    this.#initGame();
  }

  
  #initGame = async () => {
    this.cards = this.#generateCards();
    this.matchedPairs = 0;
    this.activeCards = [];
    this.#render();
  };

  
  #generateCards() {
    const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥥'];
    let cards = [...icons, ...icons]; 
    return cards.sort(() => 0.5 - Math.random()); 
  }

  #handleCardClick = (index) => {
    if (this.activeCards.length < 2 && !this.activeCards.includes(index)) {
      this.activeCards.push(index);
      if (this.activeCards.length === 2) {
        this.#checkMatch();
      }
      this.#render();
    }
  };

 
  #checkMatch() {
    const [first, second] = this.activeCards;
    if (this.cards[first] === this.cards[second]) {
      this.matchedPairs++;
      this.activeCards = [];
    } else {
      setTimeout(() => {
        this.activeCards = [];
        this.#render();
      }, 1000);
    }
  }

  #render() {
    let body = html`
      <main>
        <h1>Memory Game</h1>
        <div class="game-board">
          ${this.cards.map((card, index) => html`
            <div class="card ${this.activeCards.includes(index) ? 'flipped' : ''}"
              @click="${() => this.#handleCardClick(index)}">
              ${this.activeCards.includes(index) ? card : ''}
            </div>
          `)}
        </div>
        ${this.matchedPairs === this.cards.length / 2 ? html`
          <div class="win-message">You won! 🎉</div>
          <button @click="${this.#initGame}">Play Again</button>
        ` : ''}
      </main>
    `;
    render(body, document.getElementById('root'));
  }
}

export default App;
