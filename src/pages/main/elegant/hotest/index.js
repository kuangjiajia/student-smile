import React, { Component } from "react";
import ClassItem from "../../../../component/classItem/index.js";
import api from "../../../../api/index.js";
import Loading from "../../../../component/loading/index.js";

class Hotest extends Component {
  constructor(props) {
    super(props);
    this.state = { classList: [], isLoading: true };
  }
  async componentDidMount() {
    const dt = await api.getClassList({ type: "rank" });
    const classList = dt.data.data;
    console.log(classList);
    this.setState({ classList, isLoading: false });
  }
  render() {
    const { classList } = this.state;
    return (
      <div>
        {this.state.isLoading ? <Loading /> : null}
        {classList.map((item, index) => {
          const length = item.length;
          return (
            <ClassItem
              classid={item.class_id}
              college={item.college}
              imgUrl={item.img_url}
              score={item.score}
              rank={index}
              key={item.class_id}
              type={length === 6 ? "wall" : "rank"}
            />
          );
        })}
      </div>
    );
  }
}

export default Hotest;
