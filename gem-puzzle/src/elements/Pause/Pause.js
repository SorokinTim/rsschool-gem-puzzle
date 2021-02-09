import style from './Pause.module.css';
import * as consts from '../../BLL/constants';

export default class Pause {
  constructor(properties) {
    this.element = document.createElement('span');

    this.icon = properties.icon;
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
    this.element.appendChild(icon);

    return this.element;
  }
}
