import style from './GameArea.module.css';
import {
  createComponent, getElementQueue, moveController, getPositionsForCanvas,
} from './logic/logic';
import * as consts from '../../BLL/constants';

import imageZero from '../../assets/images/0.jpg';
import imageFirst from '../../assets/images/1.jpg';
import imageSecond from '../../assets/images/2.jpg';
import imageThird from '../../assets/images/3.jpg';
import imageFourth from '../../assets/images/4.jpg';
import imageFifth from '../../assets/images/5.jpg';
import imageSixth from '../../assets/images/6.jpg';
import imageSeventh from '../../assets/images/7.jpg';
import imageEight from '../../assets/images/8.jpg';

const imagesArray = [
  imageZero,
  imageFirst,
  imageSecond,
  imageThird,
  imageFourth,
  imageFifth,
  imageSixth,
  imageSeventh,
  imageEight,
];

export default class GameArea {
  constructor(properties = {}) {
    this.element = document.createElement('div');

    this.counter = properties.counter;
    this.count = properties.count;
    this.timer = properties.timer;
    this.props = properties;
  }

  createGameKeys() {
    const elementsQueueArray = getElementQueue(this.count);
    const gameKeysArray = [];
    const positionsArr = getPositionsForCanvas(this.count, consts.DEFAULT_AREA_SIZE);
    const imageSrc = imagesArray[Math.round(Math.random() * 8)];

    elementsQueueArray.forEach((elem, index) => {
      const key = createComponent(
        {
          num: elem,
          className: style.box,
          order: index + 1,
        },
      );

      key.style.backgroundImage = `url(${imageSrc})`;
      key.style.backgroundRepeat = 'no-repeat';
      key.style.backgroundSize = `${positionsArr[elem - 1].sizePic}px`;
      key.style.backgroundPositionX = `${positionsArr[elem - 1].xPos}px`;
      key.style.backgroundPositionY = `${positionsArr[elem - 1].yPos}px`;

      this.element.appendChild(key);
      gameKeysArray.push(key);

      if (index === elementsQueueArray.length - 1) {
        const lastKey = createComponent(
          {
            num: elementsQueueArray.length + 1,
            className: style.box_empty,
            order: elementsQueueArray.length + 1,
          },
        );

        this.element.appendChild(lastKey);
        gameKeysArray.push(lastKey);
      }
    });

    return gameKeysArray;
  }

  createGameArea() {
    this.element.classList.add(style.container);
    this.element.style.gridTemplateColumns = `repeat(${this.count}, 1fr)`;
    this.element.style.gridTemplateRows = `repeat(${this.count}, 1fr)`;
    const keyElements = this.createGameKeys();

    keyElements.forEach((elem, i, array) => {
      elem.addEventListener('click', () => moveController(
        {
          target: elem,
          elementsArray: array,
          counter: this.counter,
          count: this.count,
          timer: this.timer,
          rerenderDOM: this.props.rerenderDOM,
        },
      ));
    });
  }

  getElement() {
    this.createGameArea();

    return this.element;
  }
}
