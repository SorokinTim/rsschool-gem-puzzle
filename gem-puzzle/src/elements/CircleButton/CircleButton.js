import style from './CircleButton.module.css';
import * as consts from '../../BLL/constants';

export default class CircleButton {
  constructor(properties) {
    this.element = document.createElement('div');

    this.icon = properties.icon;
    this.color = properties.color || consts.DEFAULT_COLOR;
    this.title = properties.title || consts.DEFAULT_TITLE;
  }

  createIcon() {
    const icon = document.createElement('span');

    icon.classList.add(consts.ICONS_CLASS);
    icon.innerText = this.icon;

    return icon;
  }

  getElement() {
    this.element.classList.add(
      style['circle-button'],
      (this.color === consts.COLOR_WHITE ? style['circle-button_white'] : style['circle-button_black']),
    );
    this.element.title = this.title;
    const icon = this.createIcon();
    this.element.appendChild(icon);

    return this.element;
  }
}
