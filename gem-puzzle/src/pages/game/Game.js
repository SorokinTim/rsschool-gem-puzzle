import style from './Game.module.css';
import GameArea from '../../elements/GameArea/GameArea';
import Timer from '../../elements/Timer/Timer';
import Pause from '../../elements/Pause/Pause';
import Menu from '../menu/Menu';
import MovesCounter from '../../elements/MovesCounter/MovesCounter';
import Score from '../../elements/Score/Score';
import Settings from '../../elements/Settings/Settings';
import * as consts from '../../BLL/constants';

export default class Game {
  constructor(props) {
    this.element = document.createElement('div');

    this.props = props;
  }

  static initState() {
    const topContainer = document.createElement('div');

    const pauseElement = new Pause({ icon: 'pause_circle_outline' }).getElement();
    const popupMenu = new Menu({ isPopup: true });
    const buttons = Menu.createButtons();
    const timer = new Timer({ icon: 'schedule', seconds: 0, minutes: 0 });
    const movesCounter = new MovesCounter();
    const interval = timer.startTime();

    return {
      topContainer, pauseElement, popupMenu, buttons, timer, movesCounter, interval,
    };
  }

  stylizeElements(elements = {}) {
    elements.topContainer.classList.add(style['top-container']);
    this.element.classList.add(style.container);
  }

  appendElements(elements = {}) {
    elements.topContainer.appendChild(elements.timer.getElement());
    elements.topContainer.appendChild(elements.pauseElement);

    // this.element.classList.add(style.container);
    this.element.appendChild(elements.topContainer);
    this.element.appendChild(new GameArea({
      count: (localStorage.getItem('size') || consts.DEFAULT_AREA_COUNT),
      counter: elements.movesCounter,
      timer: elements.timer,
      rerenderDOM: this.props.rerenderDOM,
    }).getElement());
    this.element.appendChild(elements.movesCounter.getElement());
  }

  addListenerToElements(elements = {}) {
    elements.buttons.forEach((elem) => {
      const documentElem = elem.getElement();

      if (elem.icon === 'play_arrow') {
        documentElem.addEventListener('click', () => {
          elements.popupMenu.getElement().remove();
          // eslint-disable-next-line no-param-reassign
          elements.interval = elements.timer.startTime();
        });
      } else if (elem.icon === 'emoji_events') {
        documentElem.addEventListener('click', () => {
          const score = new Score();
          this.element.appendChild(score.getElement());
        });
      } else if (elem.icon === 'settings') {
        documentElem.addEventListener('click', () => {
          const settings = new Settings(this.props);
          this.element.appendChild(settings.getElement());
        });
      }

      elements.popupMenu.getElement().appendChild(documentElem);
    });

    elements.pauseElement.addEventListener('click', () => {
      this.element.parentElement.appendChild(elements.popupMenu.getElement());
      Timer.stopTime(elements.interval);
    });
  }

  getElement() {
    const elements = Game.initState();

    this.stylizeElements({
      topContainer: elements.topContainer,
    });

    this.addListenerToElements({
      buttons: elements.buttons,
      pauseElement: elements.pauseElement,
      popupMenu: elements.popupMenu,
      interval: elements.interval,
      timer: elements.timer,
      movesCounter: elements.movesCounter,
    });

    this.appendElements({
      pauseElement: elements.pauseElement,
      timer: elements.timer,
      topContainer: elements.topContainer,
      movesCounter: elements.movesCounter,
    });

    return this.element;
  }
}
