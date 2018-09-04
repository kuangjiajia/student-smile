import React, { Component } from "react";
import LinkItem from "../../component/linkItem/index";
import { withRouter } from "react-router-dom";
import { LinkConfig } from "../../config/index.js";
import "./nav.less";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pathname, search } = this.props.location;
    console.log(this.props.location);
    // Object.keys(LinkConfig).map();
    return (
      <div className="nav-style">
        {Object.keys(LinkConfig).map(i => {
          if (!pathname.substr(1).indexOf(i) && search === "") {
            return (
              <LinkItem
                key={LinkConfig[i].text}
                toUrl={LinkConfig[i].to}
                iconSrc={LinkConfig[i].iconChoose}
                text={LinkConfig[i].text}
                color="#ff926b"
              />
            );
          } else {
            return (
              <LinkItem
                toUrl={LinkConfig[i].to}
                iconSrc={LinkConfig[i].icon}
                text={LinkConfig[i].text}
                key={LinkConfig[i].text}
                color="grey"
              />
            );
          }
        })}
      </div>
    );
  }
}

export default withRouter(Nav);
