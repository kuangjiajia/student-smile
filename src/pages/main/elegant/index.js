import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import "./elegant.less";
import { elegantConfig } from "../../../config/index.js";
import Newest from "./newest/index.js";
import Hotest from "./hotest/index.js";
import api from "../../../api/index.js";
import { yuming } from "../../../config/index.js";
import Loading from "../../../component/loading/index.js";

class ClassNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isLoading: false
    };
    this.searchChange = this.searchChange.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }
  searchChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }
  searchInput() {
    this.setState({
      isLoading: true
    });
    api.searchText({ class_id: this.state.searchText }).then(res => {
      this.setState({
        isLoading: false
      });
      if (res.data.msg === "succeed") {
        window.location.href = `${yuming}/#/classNav?${this.state.searchText}`;
      } else {
        alert("当前班级不存在");
      }
    });
  }
  componentDidMount() {
    const clientW = window.screen.width;
    const clientH = window.screen.height;
    const elegant = document.querySelector(".elegant");
    const elegantContent = document.querySelector(".elegant-content");
    elegant.style.height = (clientH / clientW) * 100 - 13.3 + "vw";
    elegantContent.style.height = (clientH / clientW) * 100 - 81.6 + "vw";
  }
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="elegant">
        {this.state.isLoading ? <Loading /> : null}
        <div className="elegant-search">
          <input
            type="text"
            className="search-input"
            placeholder="搜索"
            onChange={this.searchChange}
          />
          <div className="search" onClick={this.searchInput}>
            <i className="icon-search" />
          </div>
        </div>
        <div className="elegant-nav">
          {Object.keys(elegantConfig).map(i => {
            console.log(pathname.substr(1).indexOf(i));
            if (parseInt(pathname.substr(1).indexOf(i)) === 8) {
              return (
                <Link
                  to={elegantConfig[i].to}
                  className="elegant-nav-tab-choose"
                  key={elegantConfig[i].to}
                >
                  <span style={{ color: "#ff926b" }}>
                    {elegantConfig[i].text}
                  </span>
                </Link>
              );
            } else {
              return (
                <Link
                  to={elegantConfig[i].to}
                  className="elegant-nav-tab"
                  key={elegantConfig[i].to}
                >
                  <span style={{ color: "grey" }}>{elegantConfig[i].text}</span>
                </Link>
              );
            }
          })}
        </div>
        <div className="elegant-banner" />
        <div className="elegant-content">
          <Switch>
            <Route path="/elegant/newest" exact component={Newest} />
            <Route path="/elegant/hotest" exact component={Hotest} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(ClassNav);
