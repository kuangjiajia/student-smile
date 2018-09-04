import React, { Component } from "react";
import ClassItem from "../../../../component/classItem/index.js";
import api from "../../../../api/index.js";
import Loading from "../../../../component/loading/index.js";

class Newest extends Component {
  constructor(props) {
    super(props);
    this.state = { classList: [], isLoading: true };
  }
  async componentDidMount() {
    const dt = await api.getClassList({ type: "wall" });
    const classList = dt.data.data;
    console.log(classList);
    this.setState({ classList, isLoading: false });
  }
  render() {
    const { classList } = this.state;
    return (
      <div>
        {this.state.isLoading ? <Loading /> : null}
        {classList.map(item => {
          let date = new Date(item.date);
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let hours = date.getHours();
          let min = date.getMinutes();
          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }
          if (min < 10) {
            min = "0" + min;
          }
          let dateStr = month + "-" + day + "  " + hours + ":" + min;
          console.log(dateStr);
          return (
            <ClassItem
              classid={item.class_id}
              college={item.college}
              imgUrl={item.img_url}
              score={item.score}
              timeStamp={dateStr}
              key={item.class_id}
            />
          );
        })}
      </div>
    );
  }
}

export default Newest;
