import React, { Component } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

class PageButton extends Component {
  state = {
    page2: 2,
    page3: 3,
    page4: 4,
    page5: 5,
    page6: 6,
    page7: 7,
  };

  componentDidMount() {
    const id = this.props.id;
    if (id) {
      if (id > 1) {
        if (id > 3) {
          if (id <= 496) {
            this.setState({
              page2: +id - 2,
              page3: +id - 1,
              page4: id,
              page5: +id + 1,
              page6: +id + 2,
              page7: +id + 3,
            });
          } else {
            this.setState({
              page2: +id - 5,
              page3: +id - 4,
              page4: +id - 3,
              page5: +id - 2,
              page6: +id - 1,
              page7: id,
            });
          }
        } else {
          this.setState({
            page2: id,
            page3: +id + 1,
            page4: +id + 2,
            page5: +id + 3,
            page6: +id + 4,
            page7: +id + 5,
          });
        }
      } else {
        this.setState({
          page2: +id + 1,
          page3: +id + 2,
          page4: +id + 3,
          page5: +id + 4,
          page6: +id + 5,
          page7: +id + 6,
        });
      }
    }
  }

  componentDidUpdate() {
    if (isNaN(this.state.page2)) {
      this.props.navigate("/popular/1");
    }
  }

  render() {

    const {path} = this.props

    const id1 = this.props.id;

    const incremntNum = () => {
      const plus = this.state.page7;
      const plus1 = plus + 3;

      this.props.navigate(`${path}${plus1}`);
    };

    const decreaseNum = () => {
      const plus = this.state.page2;
      if (id1 === 5) {
        const plus1 = plus - 1;
        this.props.navigate(`${path}${plus1}`);
      } else if (id1 === 6) {
        const plus1 = plus - 2;
        this.props.navigate(`${path}${plus1}`);
      } else {
        const plus1 = plus - 3;
        this.props.navigate(`${path}${plus1}`);
      }
    };

    const prePage = () => {
      const id = id1 - 1;

      if (id >= 1) {
        this.props.navigate(`${path}${id}`);
      }
    };

    const nextpage = () => {
      if (id1 < 500) {
        const id = +id1 + 1;

        if (id > 1) {
          this.props.navigate(`${path}${id}`);
        }
      }
    };

    return (
      <div className="pagebutton">
        <ul className="ul-num">
          <li className="li-pageButton" onClick={prePage}>
            <FaArrowLeft />
          </li>
          <li className="li-pageButton">
            <Link
              style={{
                color: id1 === 1 ? "#4285F4" : "#f5f5f5",
                marginRight: id1 === 3 ? 18 : 0,
              }}
              to="/popular/1"
            >
              1
            </Link>
          </li>
          {id1 > 4 ? (
            <li onClick={decreaseNum} className="li-pageButton">
              {" "}
              ...{" "}
            </li>
          ) : null}
          <li className="li-pageButton">
            <Link
              style={{
                color: id1 === this.state.page2 ? "#4285F4" : "#f5f5f5",
              }}
              to={`${path}${this.state.page2}`}
            >
              {this.state.page2}
            </Link>{" "}
          </li>
          <li className="li-pageButton">
            <Link
              style={{
                color: id1 === this.state.page3 ? "#4285F4" : "#f5f5f5",
              }}
              to={`${path}${this.state.page3}`}
            >
              {this.state.page3}
            </Link>{" "}
          </li>
          <li className="li-pageButton">
            <Link
              style={{
                color: id1 === this.state.page4 ? "#4285F4" : "#f5f5f5",
              }}
              to={`${path}${this.state.page4}`}
            >
              {this.state.page4}
            </Link>{" "}
          </li>
          <li className="li-pageButton">
            <Link
              style={{
                color: id1 === this.state.page5 ? "#4285F4" : "#f5f5f5",
              }}
              to={`${path}${this.state.page5}`}
            >
              {this.state.page5}
            </Link>{" "}
          </li>
          <li className="li-pageButton hide-num">
            <Link
              style={{
                color: id1 === this.state.page6 ? "#4285F4" : "#f5f5f5",
              }}
              to={`${path}${this.state.page6}`}
            >
              {this.state.page6}
            </Link>
          </li>
          <li className="li-pageButton hide-num">
            <Link
              style={{
                color: id1 === this.state.page7 ? "#4285F4" : "#f5f5f5",
              }}
              to={`${path}${this.state.page7}`}
            >
              {this.state.page7}
            </Link>{" "}
          </li>
          {id1 < 493 && (
            <li className="li-pageButton" onClick={incremntNum}>
              {" "}
              ...{" "}
            </li>
          )}

          <li className="li-pageButton" onClick={nextpage}>
            <FaArrowRight />{" "}
          </li>
        </ul>
      </div>
    );
  }
}

export default PageButton;
