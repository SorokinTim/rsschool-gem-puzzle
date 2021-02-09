import style from './MovesCounter.module.css';

export default class MovesCounter {
  constructor() {
    this.element = document.createElement('span');

    this.moves = 0;
  }

  getMoves() {
    return this.moves;
  }

  updateMoves(step = 0) {
    this.moves += step;
    this.element.innerText = `Your moves: ${this.moves}`;
  }

  getElement() {
    this.element.classList.add(style.counter);
    this.element.innerText = 'Your moves: 0';

    return this.element;
  }
}
