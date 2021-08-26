import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const ButtonGroup = () => {
  state = { counter: 0 };

  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState((state) => ({ counter: state.counter - 1 }));
  };

  return (
    <ButtonGroup size='small' aria-label='small outlined button group'>
      <Button onClick={this.handleIncrement}>+</Button>
      {displayCounter && <Button disabled>{this.state.counter}</Button>}
      {displayCounter && <Button onClick={this.handleDecrement}>-</Button>}
    </ButtonGroup>
  );
};

export default ButtonGroup;
