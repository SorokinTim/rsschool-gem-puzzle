import style from './Score.module.css';
import * as consts from '../../BLL/constants';

export default class Score {
  constructor() {
    this.container = document.createElement('div');
    this.element = document.createElement('div');
    this.topMenu = document.createElement('div');
  }

  static writeScoreData(date, time, steps) {
    const scoreElement = document.createElement('div');
    const scoreTime = document.createElement('span');
    const scoreDate = document.createElement('span');
    const scoreSteps = document.createElement('span');

    scoreSteps.innerText = `Moves: ${steps}`;
    scoreDate.innerText = date;
    scoreTime.innerText = `${time.minutes}:${time.seconds}`;

    scoreElement.classList.add(style['score-element']);

    scoreElement.appendChild(scoreDate);
    scoreElement.appendChild(scoreTime);
    scoreElement.appendChild(scoreSteps);

    return scoreElement;
  }

  static createIcon(iconName) {
    const icon = document.createElement('span');

    icon.classList.add(consts.ICONS_CLASS);
    icon.innerText = iconName;

    return icon;
  }

  getScoreFromStorage() {
    const data = JSON.parse(localStorage.getItem('score'));

    data.forEach((elem) => {
      this.element.appendChild(Score.writeScoreData(elem.date, elem.time, elem.steps));
    });
  }

  getElement() {
    const icon = Score.createIcon('close');
    const title = document.createElement('span');

    this.container.classList.add(style.container);
    this.element.classList.add(style.score);
    this.topMenu.classList.add(style['top-menu']);
    title.classList.add(style.title);
    icon.classList.add(style.icon);

    title.innerText = 'Your score:';

    this.container.appendChild(this.element);
    this.element.appendChild(this.topMenu);

    this.getScoreFromStorage();

    this.topMenu.appendChild(title);
    this.topMenu.appendChild(icon);

    icon.addEventListener('click', () => this.container.remove());

    return this.container;
  }
}
