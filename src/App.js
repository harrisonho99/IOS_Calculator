import React from "react";
import "./styles.css";
import Screen from "./Screen";
import Table from "./Table.js";
import ValueContext from "./context";
const char = {
  first: ["AC", "+/-", "%", "÷"],
  second: [7, 8, 9, "x"],
  third: [4, 5, 6, "-"],
  forth: [1, 2, 3, "+"],
  fith: [0, ".", "="]
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operand: "",
      isPositive: true,
      placeHolder1: "",
      placeHolder2: "",
      display: "",
      handleDisplay: (event) => {
        let value = event.target.value;
        if (isNaN(value)) {
          if (value === "AC") {
            this.setState({
              display: "",
              placeHolder1: "",
              placeHolder2: "",
              operand: null
            });
          }
          if (
            value === "+" ||
            value === "-" ||
            value === "x" ||
            value === "÷" ||
            value === "%"
          ) {
            this.setState((currentState) => ({
              operand: value,
              display: "",
              placeHolder1: currentState.display
            }));
          }
          if (value === ".") {
            this.setState((currentState) => {
              if (currentState.display.indexOf(".") === -1) {
                return { display: currentState.display + "." };
              } else {
                return { display: currentState.display };
              }
            });
          }
          if (value === "+/-") {
            if (!this.state.display || Number(this.state.display) === 0) {
              return;
            }
            if (this.state.isPositive) {
              this.setState((currentState) => ({
                isPositive: !this.state.isPositive,
                display: "-" + currentState.display
              }));
            } else {
              this.setState((currentState) => ({
                isPositive: true,
                display: Number(-currentState.display)
              }));
            }
          }
          if (value === "=") {
            this.setState((currentState) => ({
              placeHolder2: currentState.display
            }));
            this.handleCalc();
          }
          return;
        }
        if (this.state.display.length >= 10) {
          return;
        }
        this.setState((currentState) => ({
          display: (currentState.display += value)
        }));
      }
    };
    this.handleCalc = this.handleCalc.bind(this);
  }
  handleCalc() {
    if (this.state.placeHolder1 !== "" && this.state.operand === "+") {
      this.setState((currentState) => {
        return {
          display:
            Number(currentState.placeHolder1) +
            Number(currentState.placeHolder2)
        };
      });
    }
    if (this.state.placeHolder1 !== "" && this.state.operand === "-") {
      this.setState((currentState) => {
        return {
          display:
            Number(currentState.placeHolder1) -
            Number(currentState.placeHolder2)
        };
      });
    }
    if (this.state.placeHolder1 !== "" && this.state.operand === "x") {
      this.setState((currentState) => {
        return {
          display:
            Number(currentState.placeHolder1) *
            Number(currentState.placeHolder2)
        };
      });
    }
    if (this.state.placeHolder1 !== "" && this.state.operand === "÷") {
      this.setState((currentState) => {
        return {
          display:
            Number(currentState.placeHolder1) /
            Number(currentState.placeHolder2)
        };
      });
    }
    if (this.state.placeHolder1 !== "" && this.state.operand === "/") {
      this.setState((currentState) => {
        return {
          display:
            Number(currentState.placeHolder1) /
            Number(currentState.placeHolder2)
        };
      });
    }
    if (this.state.placeHolder1 !== "" && this.state.operand === "%") {
      this.setState((currentState) => {
        return {
          display:
            Number(currentState.placeHolder1) %
            Number(currentState.placeHolder2)
        };
      });
    }
  }
  render() {
    return (
      <ValueContext.Provider value={this.state.handleDisplay}>
        <div className="App" style={{ maxWidth: 800 }}>
          <div
            style={{ background: "rgb(133,134,148)" }}
            className="screen-border"
          >
            <Screen value={this.state.display} />
          </div>
          <Table char={char} handleClick={this.setScreen} />
        </div>
      </ValueContext.Provider>
    );
  }
}
