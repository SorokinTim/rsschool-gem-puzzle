import style from './Timer.module.css';
import * as consts from '../../BLL/constants';

export default class Timer {
  constructor(properties = {}) {
    this.container = document.createElement('div');
    this.element = document.createElement('span');

    this.icon = properties.icon;
    this.minutes = properties.minutes || 0;
    this.seconds = properties.seconds || 0;
  }

  getTime() {
    return { seconds: this.seconds, minutes: this.minutes };
  }

  startTime() {
    this.element.innerText = `${this.minutes}:${this.seconds < 10 ? `0${String(this.seconds)}` : this.seconds}`;

    return setInterval(() => {
      if (this.seconds >= 59) {
        this.seconds = -1;
        this.minutes += 1;
      }
      this.seconds += 1;
      this.element.innerText = `${this.minutes}:${this.seconds < 10 ? `0${String(this.seconds)}` : this.seconds}`;
    }, 1000);
  }

  static stopTime(interval) {
    clearInterval(interval);
  }

  createIcon() {
    const icon = document.createElement('span');

    icon.classList.add(consts.ICONS_CLASS);
    icon.innerText = this.icon;

    return icon;
  }

  getElement() {
    const icon = this.createIcon();

    icon.classList.add(style.icon);

    this.container.classList.add(style.container);
    this.element.classList.add(style.timer);
    this.container.appendChild(icon);
    this.container.appendChild(this.element);

    return this.container;
  }
}
