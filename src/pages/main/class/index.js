import React, { Component } from "react";
import api from "../../../api/index.js";
import { withRouter } from "react-router-dom";
import StuItem from "../../../component/stuItem/index.js";
import Loading from "../../../component/loading/index.js";
import "./class.less";
class ClassNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classmates: [],
      classInfo: {},
      type: "new",
      isLoading: true,
      index: 0,
      showImgSrc: "",
      isShow: false
    };
    this.goodTouch = this.goodTouch.bind(this);
    this.cancelShow = this.cancelShow.bind(this);
    this.showImg = this.showImg.bind(this);
  }
  async componentDidMount() {
    const clientW = window.screen.width;
    const clientH = window.screen.height;
    const classItemList = document.querySelector(".class-item-lists");
    const classItem = document.querySelector(".class-item");
    classItemList.style.height = (clientH / clientW) * 100 - 21.3 + "vw";
    classItem.style.height = (clientH / clientW) * 100 - 13.3 + "vw";
    const stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
    const { stu_id } = stu_info;
    if (
      stu_id &&
      stu_id.substr(0, 4) !== "2018" &&
      this.props.location.search.indexOf("?") === -1
    ) {
      //老生个人班级
      this.setState({ type: "old" });
    } else {
      //新生
      var search = this.props.location.search;
      search = search.substr(search.indexOf("?") + 1);
      if (search === "") {
        //个人班级信息
        const stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
        const { class_id } = stu_info;
        const dt = await api.getClassInfor({ class_id });
        if (dt.data.data) {
          this.setState({
            classmates: dt.data.data.stu_info,
            classInfo: dt.data.data.class_info
          });
        } else {
          this.setState({ type: "old" });
        }
      } else {
        //班级信息
        const dt = await api.getClassInfor({ class_id: search });
        if (dt.data.msg === "bad parameters") {
          this.setState({ type: "old" });
        } else {
          this.setState({
            classmates: dt.data.data.stu_info,
            classInfo: dt.data.data.class_info
          });
        }
      }
    }
    this.setState({
      isLoading: false
    });
  }
  cancelShow() {
    this.setState({
      isShow: false
    });
  }
  showImg(imgurl) {
    console.log(123);
    this.setState({ isShow: true, showImgSrc: imgurl });
  }
  goodTouch() {
    this.setState({
      isLoading: true
    });
    api
      .goodClick({
        class_id: this.state.classInfo.class_id
      })
      .then(res => {
        if (res.data.msg === "cannot vote unless you have bind info") {
          const openid = JSON.parse(sessionStorage.getItem("openid"));
          window.location.href ===
            `https://wx.idsbllp.cn/MagicLoop/index.php?s=/addon/Bind/Bind/bind/openid/${openid}/token/gh_68f0a1ffc303`;
        } else if (res.data.msg === "class does not exist") {
          alert("班级不存在");
        } else if (res.data.msg === "cannot vote unless you have shared") {
          alert("只有晒照才能投票");
        } else if (res.data.msg === "cannot vote to unloaded pic classes") {
          alert("只能给有晒照的班级投票");
        } else if (res.data.msg === "run out of times") {
          alert("当天投票次数用完，每人每天5票");
        } else {
          this.setState({
            classInfo: {
              ...this.state.classInfo,
              class_rank: res.data.data.rank,
              received_votes: res.data.data.received_votes
            }
          });
          alert("点赞成功");
        }
        this.setState({
          isLoading: false
        });
      });
  }
  render() {
    const { type, isShow } = this.state;
    const style = isShow ? { display: "block" } : { display: "none" };
    // let style1 = type === "old" ? { display: "block" } : { display: "none" };
    // let style2 = type === "new" ? { display: "block" } : { display: "none" };
    const stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
    const { stu_id } = stu_info;
    let that = this;

    if (this.state.index === 0) {
      //第一次点击
      if (this.props.location.search === "") {
        //个人信息
        if (!stu_id || stu_id.substr(0, 4) !== "2018") {
          // 不是新生
          console.log(123);
          this.setState({
            type: "old",
            index: 1
          });
        } else {
          const stu_info = JSON.parse(sessionStorage.getItem("stu_info"));
          const { class_id } = stu_info;

          api.getClassInfor({ class_id }).then(dt => {
            if (dt.data.msg === "bad parameters") {
              this.setState({ type: "old", index: 1 });
            } else {
              this.setState({
                classmates: dt.data.data.stu_info,
                classInfo: dt.data.data.class_info,
                index: 1
              });
            }
          });
        }
      }
    }

    return (
      <div>
        {this.state.isLoading ? <Loading /> : null}
        {this.state.type === "old" ? (
          <div className="classNav">
            <div className="classNav-img" />
            <div className="classNav-text">快去给他们点赞吧</div>
          </div>
        ) : (
          <div className="class-item">
            <div className="class-item-header">
              <div className="class-item-header-scName">
                {this.state.classInfo.college}(<span />
                {this.state.classInfo.class_rank})<i onClick={this.goodTouch} />
                &nbsp;
                {this.state.classInfo.received_votes}
              </div>
            </div>
            <div className="class-item-lists">
              {this.state.classmates.map(item => {
                return (
                  <StuItem
                    imgUrl={item.img_url}
                    nickname={item.nickname}
                    descp={item.descp}
                    key={item.stu_id}
                    onClickImg={this.showImg}
                  />
                );
              })}
            </div>

            <div className="image-show" onClick={this.cancelShow} style={style}>
              <img src={this.state.showImgSrc} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ClassNav);
