import React, { Component } from "react";
import "./stuItem.less";

class StuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
    this.showImgClick = this.showImgClick.bind(this);
  }
  showImgClick() {
    this.props.onClickImg(this.props.imgUrl);
  }
  render() {
    const { imgUrl, nickname, descp } = this.props;
    return (
      <div className="stu-item">
        <img
          src={imgUrl}
          className="stu-item-banner"
          onClick={this.showImgClick}
        />
        <div className="stu-item-nickName">{nickname}</div>
        <div className="stu-item-desc">{descp}</div>
      </div>
    );
  }
}

export default StuItem;
