import Game from './pages/game/Game';
import './main.css';

function render(element) {
  return document.body.appendChild(element);
}

function clearDOM() {
  document.body.innerHTML = '<script src="main.bundle.js">';
}

function rerenderDOM() {
  clearDOM();
  render(new Game({ rerenderDOM }).getElement());
}

render(new Game({ rerenderDOM }).getElement());

document.addEventListener('keypress', (event) => {
  if ((event.shiftKey && event.keyCode === 78) || (event.shiftKey && event.code === 'KeyN')) {
    rerenderDOM();
  }
});
