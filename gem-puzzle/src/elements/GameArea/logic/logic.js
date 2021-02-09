import audioSrc from '../../../assets/audio/moveSound.mp3';
import * as constants from '../../../BLL/constants';

export function syncElemOrder(elem, order = 0) {
  elem.setAttribute('data-order', order || constants.DEFAULT_NO_ORDER_PUZZLE);
  // eslint-disable-next-line no-param-reassign
  elem.style.order = elem.attributes['data-order'].value;
}

export function createComponent(properties = {}) {
  const element = document.createElement('div');

  element.classList.add(properties.className);
  element.innerText = properties.num || constants.DEFAULT_EMPTY_PUZZLE_CONTENT;
  syncElemOrder(element, properties.order);

  return element;
}

function isFinished(elementsArray) {
  const activeKeys = [];

  elementsArray.forEach((elem) => {
    if (Number(elem.innerHTML) !== elementsArray.length) activeKeys.push(elem);
  });

  return !(activeKeys.map((elem) => Number(elem.innerText) === Number(elem.attributes['data-order'].value))).includes(false);
}

function getFinishMsg(timer, counter) {
  return `Ура! Вы решили головоломку за ${timer.getTime().minutes}:${timer.getTime().seconds < 10 ? `0${timer.getTime().seconds}` : timer.getTime().seconds} минут и ${counter.getMoves()} ходов!`;
}

function writeScoreToLocalStorage(date, time, steps) {
  const data = JSON.parse(localStorage.getItem('score')) || [];

  data.push({ date, time, steps });

  localStorage.setItem('score', JSON.stringify(data));
}

function playAudio(src) {
  const audio = new Audio(src);

  return JSON.parse(localStorage.getItem('sound')) ? audio.play() : null;
}

export function getPositionsForCanvas(count, areaSize = constants.DEFAULT_AREA_SIZE) {
  const elementSize = areaSize / count;
  const result = [];

  for (let y = 0; y < count; y += 1) {
    for (let x = 0; x < count; x += 1) {
      result.push({
        xPos: 0 - x * elementSize,
        yPos: 0 - y * elementSize,
        sizePic: areaSize,
      });
    }
  }

  return result;
}

function playAnimation(properties) {
  switch (properties.type) {
    case constants.ANIMATION_TYPE_UP:
      properties.elem.animate([
        { transform: `translateY(${(properties.areaSize || constants.DEFAULT_AREA_SIZE) / properties.count}px)` },
        { transform: 'translateY(0)' },
      ], {
        duration: 100,
      });
      break;
    case constants.ANIMATION_TYPE_DOWN:
      properties.elem.animate([
        { transform: `translateY(-${(properties.areaSize || constants.DEFAULT_AREA_SIZE) / properties.count}px)` },
        { transform: 'translateY(0)' },
      ], {
        duration: 100,
      });
      break;
    case constants.ANIMATION_TYPE_LEFT:
      properties.elem.animate([
        { transform: `translateX(-${(properties.areaSize || constants.DEFAULT_AREA_SIZE) / properties.count}px)` },
        { transform: 'translateX(0)' },
      ], {
        duration: 100,
      });
      break;
    case constants.ANIMATION_TYPE_RIGHT:
      properties.elem.animate([
        { transform: `translateX(${(properties.areaSize || constants.DEFAULT_AREA_SIZE) / properties.count}px)` },
        { transform: 'translateX(0)' },
      ], {
        duration: 100,
      });
      break;
    default:
      break;
  }
}

function isItPossibleToSolveQueue(queueArr = []) {
  const resultArray = queueArr.map((elem, i, arr) => {
    let result = 0;

    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j] < elem) result += 1;
    }

    return result;
  });

  return resultArray.reduce((sum, elem) => sum + elem) % 2 === 0;
}

export function getElementQueue(count) {
  const arraySize = count * count - 1;
  const result = [];

  for (let i = 0; i < arraySize;) {
    const number = Math.floor(Math.random() * (arraySize)) + 1;
    if (!result.includes(number)) {
      result.push(number);
      i += 1;
    }
  }

  return isItPossibleToSolveQueue(result) ? result : getElementQueue(count);
}

function makeStep(properties = {}) {
  playAnimation({
    elem: properties.target,
    count: properties.count,
    areaSize: constants.DEFAULT_AREA_SIZE,
    type: properties.type,
  });
  syncElemOrder(properties.target, properties.currentPos);
  syncElemOrder(properties.elem, properties.targetPos);
  playAudio(audioSrc);
  properties.counter.updateMoves(1);

  if (isFinished(properties.elementsArray)) {
    setTimeout(() => {
      properties.rerenderDOM();
      alert(getFinishMsg(properties.timer, properties.counter));
      writeScoreToLocalStorage(
        new Date().toLocaleDateString(),
        {
          seconds: properties.timer.getTime().seconds < 10 ? `0${properties.timer.getTime().seconds}` : properties.timer.getTime().seconds,
          minutes: properties.timer.getTime().minutes,
        },
        properties.counter.getMoves(),
      );
    }, 200);
  }
}

export function moveController(properties = {}) {
  const targetPos = Number(properties.target.attributes['data-order'].value);

  properties.elementsArray.forEach((elem) => {
    const count = Number(properties.count);
    const currentPos = Number(elem.attributes['data-order'].value);

    if (currentPos === targetPos + 1 && Number(elem.innerText) === 0 && targetPos % count !== 0) {
      makeStep({
        target: properties.target,
        count: properties.count,
        counter: properties.counter,
        elementsArray: properties.elementsArray,
        rerenderDOM: properties.rerenderDOM,
        timer: properties.timer,
        type: constants.ANIMATION_TYPE_LEFT,
        currentPos,
        elem,
        targetPos,
      });
    } else if (
      currentPos === targetPos - 1
      && Number(elem.innerText) === 0
      && currentPos % count !== 0
    ) {
      makeStep({
        target: properties.target,
        count: properties.count,
        counter: properties.counter,
        elementsArray: properties.elementsArray,
        rerenderDOM: properties.rerenderDOM,
        timer: properties.timer,
        type: constants.ANIMATION_TYPE_RIGHT,
        currentPos,
        elem,
        targetPos,
      });
    } else if (currentPos === targetPos - count && Number(elem.innerText) === 0) {
      makeStep({
        target: properties.target,
        count: properties.count,
        counter: properties.counter,
        elementsArray: properties.elementsArray,
        rerenderDOM: properties.rerenderDOM,
        timer: properties.timer,
        type: constants.ANIMATION_TYPE_UP,
        currentPos,
        elem,
        targetPos,
      });
    } else if (currentPos === targetPos + count && Number(elem.innerText) === 0) {
      makeStep({
        target: properties.target,
        count: properties.count,
        counter: properties.counter,
        elementsArray: properties.elementsArray,
        rerenderDOM: properties.rerenderDOM,
        timer: properties.timer,
        type: constants.ANIMATION_TYPE_DOWN,
        currentPos,
        elem,
        targetPos,
      });
    }

    return Number(properties.counter);
  });
}
