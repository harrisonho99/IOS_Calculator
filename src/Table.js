import React from "react";
import ValueContext from "./context";
let heightBtn = "20%";
var btnWidth;
export default class Table extends React.Component {
  render() {
    if (window.innerWidth >= 680) {
      btnWidth = {
        nomalSize: "200px  200px 200px auto",
        specialSize: "400px  200px auto"
      };
    }
    if (window.innerWidth < 680) {
      btnWidth = {
        nomalSize: "120px  120px 120px auto",
        specialSize: "240px 120px auto"
      };
    }

    return (
      <div className="button-wrapper">
        <div className="table-bar" style={{ borderCollapse: "collapse" }}>
          <div
            className="first-row row"
            style={{
              display: "grid",
              gridTemplateColumns: btnWidth.nomalSize,
              height: heightBtn
            }}
          >
            <Charactor name={this.props.char.first} />
          </div>
          <div
            className="second-row row"
            style={{
              display: "grid",
              gridTemplateColumns: btnWidth.nomalSize,
              height: heightBtn
            }}
          >
            <Charactor name={this.props.char.second} />
          </div>
          <div
            className="third-row row"
            style={{
              display: "grid",
              gridTemplateColumns: btnWidth.nomalSize,
              height: heightBtn
            }}
          >
            <Charactor name={this.props.char.third} />
          </div>
          <div
            className="forth-row row"
            style={{
              display: "grid",
              gridTemplateColumns: btnWidth.nomalSize,
              height: heightBtn
            }}
          >
            <Charactor name={this.props.char.forth} />
          </div>
          <div
            className="fith-row row"
            style={{
              display: "grid",
              gridTemplateColumns: btnWidth.specialSize,
              height: heightBtn
            }}
          >
            <Charactor name={this.props.char.fith} />
          </div>
        </div>
      </div>
    );
  }
}
class Charactor extends React.Component {
  static contextType = ValueContext;
  render() {
    return this.props.name.map((e) => {
      return (
        <ValueContext.Consumer key={e}>
          {(func) => (
            <div style={{ display: "inline" }}>
              <button
                value={e}
                className="Calc"
                style={{
                  width: "100%",
                  height: "100%"
                }}
                onClick={func}
              >
                {e}
              </button>
            </div>
          )}
        </ValueContext.Consumer>
      );
    });
  }
}
