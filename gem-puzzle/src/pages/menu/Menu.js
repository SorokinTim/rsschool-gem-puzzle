import CircleButton from '../../elements/CircleButton/CircleButton';
import style from './Menu.module.css';
import * as consts from '../../BLL/constants';

export default class Menu {
  constructor(properties = {}) {
    this.element = document.createElement('div');

    this.isPopup = properties.isPopup || false;
  }

  static createButtons() {
    const saveBtn = new CircleButton({ icon: 'save', title: 'Save games', color: consts.COLOR_WHITE });
    const settingBtn = new CircleButton({ icon: 'settings', title: 'Settings', color: consts.COLOR_WHITE });
    const playBtn = new CircleButton({ icon: 'play_arrow', title: 'Play', color: consts.COLOR_WHITE });
    const scoreBtn = new CircleButton({ icon: 'emoji_events', title: 'Score', color: consts.COLOR_WHITE });
    const ruleBtn = new CircleButton({ icon: 'rule', title: 'Rules', color: consts.COLOR_WHITE });

    return [saveBtn, settingBtn, playBtn, scoreBtn, ruleBtn];
  }

  getElement() {
    this.element.classList.add(this.isPopup ? style.container_popup : style.container);

    return this.element;
  }
}
