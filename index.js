const NAME = 'DROP_ANIMATION'
const NOOP = () => {};

const type = {
  // 掉落元素
  element: null,
  // 父级容器
  container: document.body,
  // 起点位置
  startPosition: {
    x: 0,
    y: 0,
  },
  // 终点位置
  endPosition: {
    x: 0,
    y: 0,
  },
  // 掉落元素宽度
  width: 0,
  // 掉落元素高度
  height: 0,
  // 动画时间
  duration: 600,
  // 弹跳的高度
  jumpHeight: 60,
  // 缩放值
  scale: 1,
  // 旋转度数, eg: 360
  rotate: 0,
  // 动画结束回调
  onEnd: NOOP,
  // 是否需要收尾动画
  endAnimation: true,
  // 收尾旋转角度
  endRotate: 360,
  // 收尾弹跳的高度
  endJumpHeight: 40,
  // 收尾动画时间
  endAnimationDuration: 400,
};

function calculator({
  from,
  to,
  duration,
  startTS,
  easing = t => t,
}) {
  return nowTS => {
    const t = easing((nowTS - startTS) / duration);
    return (to - from) * t + from;
  }
}

function error(...args) {
  console.error(`[${NAME}]`, ...args);
}

class Dropper {
  constructor(props) {
    this.props = Object.assign(type, props);

    this.element = this.createElement();

    this.startPosition = {
      x: this.props.startPosition.x - (this.props.width / 2),
      y: this.props.startPosition.y - (this.props.height / 2),
    };
    this.endPosition = {
      x: this.props.endPosition.x - (this.props.width / 2),
      y: this.props.endPosition.y - (this.props.height / 2),
    };
    
    this.startDropAnimation();
  }

  createElement() {
    const originElement = this.props.element;
    let newElement;
    
    if (originElement instanceof Element) {
      newElement = originElement;
    }
    
    if (typeof originElement === 'string') {
      newElement = document.createElement('div');
      newElement.innerHTML = originElement;
    } else {
      error('element must be Element or String');
      return;
    }

    newElement.style.position = 'fixed';
    this.props.container.append(newElement);

    return newElement;
  }
  getAB() {
    let a;
    let b;
    const dy = this.endPosition.y - this.startPosition.y;

    if (dy > 0) {
      const k = this.props.jumpHeight / dy;
      b = -Math.sqrt((4 * k * k) + (4 * k)) - (2 * k);
    } else {
      const k = (this.props.jumpHeight / dy) - 1;
      b = Math.sqrt((4 * k * k) + (4 * k)) - (2 * k);
    }
    a = 1 - b;
    return {
      a,
      b,
    };
  }
  // 开始掉落动画
  startDropAnimation() {
    this.startDropTS = +new Date();
    this.renderDropAnimation = this.renderDropAnimation.bind(this);

    const {
      a,
      b,
    } = this.getAB();

    this.getDropX = calculator({
      from: this.startPosition.x,
      to: this.endPosition.x,
      duration: this.props.duration,
      startTS: this.startDropTS,
    });
    this.getDropY = calculator({
      from: this.startPosition.y,
      to: this.endPosition.y,
      duration: this.props.duration,
      startTS: this.startDropTS,
      easing: t => (a * t * t) + (b * t),
    });
    this.getDropRotate = calculator({
      from: 0,
      to: this.props.rotate,
      duration: this.props.duration,
      startTS: this.startDropTS,
    });
    this.getDropScale = calculator({
      from: 1,
      to: this.props.scale,
      duration: this.props.duration,
      startTS: this.startDropTS,
    });

    requestAnimationFrame(this.renderDropAnimation);
  }
  // 渲染掉落动画
  renderDropAnimation() {
    const nowTS = +new Date();
    if (nowTS - this.startDropTS > this.props.duration) {
      if (this.props.endAnimation) {
        this.startEndAnimation(nowTS);
      } else {
        this.element.remove();
        this.props.onEnd();
      }
      return;
    }

    const x = this.getDropX(nowTS);
    const y = this.getDropY(nowTS);
    const rotate = this.getDropRotate(nowTS);
    const scale = this.getDropScale(nowTS);
    
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    this.element.style.transform = `rotate(${rotate}deg)scale(${scale})`;
    window.requestAnimationFrame(this.renderDropAnimation);
  }
  // 开始收尾动画
  startEndAnimation(nowTS) {
    this.startEndTS = nowTS;
    this.renderEndAnimation = this.renderEndAnimation.bind(this);

    this.getEndY = calculator({
      from: this.endPosition.y,
      to: this.endPosition.y - this.props.endJumpHeight,
      duration: this.props.endAnimationDuration,
      startTS: nowTS,
      easing: t => Math.sin(t * Math.PI),
    });
    this.getEndRotate = calculator({
      from: this.props.rotate,
      to: this.props.endRotate,
      duration: this.props.endAnimationDuration,
      startTS: nowTS,
    });
    this.getEndOpacity = calculator({
      from: 1,
      to: 0,
      duration: this.props.endAnimationDuration,
      startTS: nowTS,
    });
    requestAnimationFrame(this.renderEndAnimation);
  }
  // 渲染回弹动画
  renderEndAnimation() {
    const nowTS = +new Date();
    if (nowTS - this.startEndTS > this.props.endAnimationDuration) {
      this.element.remove();
      this.props.onEnd();
      return;
    }

    const y = this.getEndY(nowTS);
    const rotate = this.getEndRotate(nowTS);
    const opacity = this.getEndOpacity(nowTS);

    this.element.style.top = `${y}px`;
    this.element.style.transform = `rotate(${rotate}deg)scale(${this.props.scale})`;
    this.element.style.opacity = opacity;
    window.requestAnimationFrame(this.renderEndAnimation);
  }
}

export default Dropper;
