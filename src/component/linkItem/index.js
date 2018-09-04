import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./linkItem.less";
class LinkItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { toUrl, text, iconSrc, color } = this.props;
    return (
      <Link className="linkItem-style" to={toUrl}>
        <img src={iconSrc} />
        <span style={{ color }}>{text}</span>
      </Link>
    );
  }
}

export default LinkItem;
