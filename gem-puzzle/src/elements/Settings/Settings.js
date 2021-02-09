import style from './Settings.module.css';
import * as consts from '../../BLL/constants';

export default class Settings {
  constructor(props) {
    this.container = document.createElement('div');
    this.element = document.createElement('div');
    this.topMenu = document.createElement('div');
    this.content = document.createElement('div');

    this.props = props;
  }

  static getSelect(options = [], descriptionText) {
    const container = document.createElement('div');
    const select = document.createElement('select');
    const description = document.createElement('span');

    options.forEach((elem) => {
      const option = document.createElement('option');
      option.value = elem.value;
      option.innerText = elem.text;

      select.appendChild(option);
    });

    description.innerText = `${descriptionText}: `;

    container.appendChild(description);
    container.appendChild(select);

    select.classList.add(style.select);
    container.classList.add(style['select-container']);
    description.classList.add(style['select-description']);

    return container;
  }

  static createIcon(iconName) {
    const icon = document.createElement('span');

    icon.classList.add(consts.ICONS_CLASS);
    icon.innerText = iconName;

    return icon;
  }

  static getButton() {
    const btn = document.createElement('button');

    btn.innerText = 'Save changes';

    btn.classList.add(style.btn);

    return btn;
  }

  static initState() {
    const icon = Settings.createIcon('close');
    const selectSize = Settings.getSelect([
      { value: 3, text: '3 x 3' },
      { value: 4, text: '4 x 4' },
      { value: 5, text: '5 x 5' },
      { value: 6, text: '6 x 6' },
      { value: 7, text: '7 x 7' },
      { value: 8, text: '8 x 8' },
    ], 'Field size');
    const selectSound = Settings.getSelect([
      { value: true, text: 'On' },
      { value: false, text: 'Off' },
    ], 'Sound state');
    // eslint-disable-next-line no-undef
    const title = document.createElement('span');
    const btn = Settings.getButton();

    title.innerText = 'Settings';

    return {
      btn, icon, selectSize, selectSound, title,
    };
  }

  static stylizeElements(elements = {}) {
    elements.container.classList.add(style.container);
    elements.element.classList.add(style.score);
    elements.topMenu.classList.add(style['top-menu']);
    elements.content.classList.add(style.content);
    elements.title.classList.add(style.title);
    elements.icon.classList.add(style.icon);
  }

  appendElements(elements = {}) {
    this.container.appendChild(this.element);
    this.element.appendChild(this.topMenu);
    this.element.appendChild(this.content);
    this.content.appendChild(elements.selectSize);
    this.content.appendChild(elements.selectSound);
    this.content.appendChild(elements.btn);

    this.topMenu.appendChild(elements.title);
    this.topMenu.appendChild(elements.icon);
  }

  addListenerToElements(elements = {}) {
    elements.icon.addEventListener('click', () => this.container.remove());
    elements.btn.addEventListener('click', () => {
      localStorage.setItem('size', Number(elements.selectSize.lastElementChild.value));
      localStorage.setItem('sound', elements.selectSound.lastElementChild.value);

      this.props.rerenderDOM();
    });
  }

  getElement() {
    const elements = Settings.initState();

    Settings.stylizeElements({
      container: this.container,
      element: this.element,
      topMenu: this.topMenu,
      content: this.content,
      title: elements.title,
      icon: elements.icon,
    });

    this.appendElements({
      selectSize: elements.selectSize,
      selectSound: elements.selectSound,
      btn: elements.btn,
      title: elements.title,
      icon: elements.icon,
    });

    this.addListenerToElements({
      icon: elements.icon,
      btn: elements.btn,
      selectSize: elements.selectSize,
      selectSound: elements.selectSound,
    });

    return this.container;
  }
}
