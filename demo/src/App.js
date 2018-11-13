import React from 'react';
import './App.css';
import Dropper from 'drop-animation';

const LIST_LEN = 15;

function AddButton(props) {
  return (
    <span className="icon-add_shopping_cart add-button" onClick={props.onClick} />
  );
}

function ListItem(props) {
  return (
    <div className="listItem">
      <AddButton onClick={props.onClick} />
      <AddButton onClick={props.onClick} />
      <AddButton onClick={props.onClick} />
      <AddButton onClick={props.onClick} />
    </div>
  );
}

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.list = new Array(LIST_LEN).fill();
    this.state = {
      droppers: [],
      count: 0,
    };
    this.droppers = [];
    this.endPosition = null;
  }

  onClick = e => {
    const {
      left: x,
      top: y,
      width,
      height,
    } = e.target.getBoundingClientRect();

    new Dropper({
      element: '<image class="dropper" src="http://tva1.sinaimg.cn/crop.0.0.217.217.180/4c8b519djw8fa45br0vpxj2062062q33.jpg" />',
      container: this.container,
      startPosition: {
        x: x + width / 2,
        y: y + height / 2,
      },
      endPosition: this.endPosition,
      width: 40,
      height: 40,
      rotate: 360,
      scale: 0.5,
    });
  }

  getContainer = el => {
    this.container = el;
  }
  getCart = el => {
    const {
      left: x,
      top: y,
      width,
      height,
    } = el.getBoundingClientRect();
    this.endPosition = {
      x: x + width / 2,
      y: y + height / 2,
    };
  }

  render() {
    return (
      <>
        <div>
          {
            this.list.map((item, index) => (
              <ListItem key={index} onClick={this.onClick} />
            ))
          }
        </div>
        <span className="icon-shopping_cart cart" ref={this.getCart}/>
        <div ref={this.getContainer}></div>
      </>
    );
  }
}

export default App;
