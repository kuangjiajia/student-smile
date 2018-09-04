import React, { Component } from "react";
import "./classItem.less";
import { Link } from "react-router-dom";
import rank from "./rank.png";
class ClassItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { classid, college, imgUrl, score, rank, timeStamp, type } = this.props;
    timeStamp = timeStamp ? timeStamp : "09-01 10:20";
    return (
      <Link to={`/classNav?${classid}`} className="classItem">
        <img src={imgUrl} className="class-pic" />
        <div className="class-content">
          <h2 className="class-id">{classid}</h2>
          <h3 className="class-name">{college}</h3>
          <div className="class-content-footer">
            <div className="rank">
              <span className="rank-icon" />
              {type === "rank" ? (
                <span>{rank + 1}</span>
              ) : (
                <span>{timeStamp}</span>
              )}
            </div>
            <div className="score">
              <span className="score-icon" />
              <span>得分</span>
              <span>{score}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ClassItem;
