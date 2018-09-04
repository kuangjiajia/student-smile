import React, { Component } from "react";
import Nav from "../pages/nav/index.js";
import Main from "../pages/main/index.js";
import api from "../api/index.js";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    const dt = await api.getUserInfo();
    const { stu_info, wechat_info, smile_info } = dt.data.data;
    sessionStorage.setItem("stu_info", JSON.stringify(stu_info));
    sessionStorage.setItem("openid", wechat_info.openid);
    sessionStorage.setItem("smile_info", JSON.stringify(smile_info));
  }
  render() {
    return (
      <div>
        <Main />
        <Nav />
      </div>
    );
  }
}

export default Root;
