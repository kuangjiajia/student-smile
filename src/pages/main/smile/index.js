import React, { Component } from "react";
import api from "../../../api/index.js";
import "./smile.less";
import Loading from "../../../component/loading/index.js";

class Smile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: "",
      file: "",
      nickname: "",
      declare: "",
      isShow: 0,
      second: false,
      isLoading: false
    };
    this.submit = this.submit.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.cancle = this.cancle.bind(this);
    this.sureRedirect = this.sureRedirect.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }
  componentDidMount() {
    const stu_info = sessionStorage.getItem("stu_info");
    if (stu_info === "null") {
      this.setState({
        isShow: 2
      });
    } else {
      console.log(JSON.parse(stu_info));
      const { stu_id } = JSON.parse(stu_info);
      if (!stu_id || parseInt(stu_id.substr(0, 4)) !== 2018) {
        this.setState({ isShow: 3 });
      } else {
        const smile_info = sessionStorage.getItem("smile_info");
        if (smile_info !== "null") {
          (function(data) {
            const { nickname, img_url, descp } = JSON.parse(smile_info);
            this.setState({ nickname, declare: descp, imgSrc: img_url });
          }.call(this, smile_info));
        }
      }
    }
    const clientW = window.screen.width;
    const clientH = window.screen.height;
    const smile = document.querySelector(".smile");
    const smileContent = document.querySelector(".smile-content");
    smileContent.style.height = (clientH / clientW) * 100 - 23.3 + "vw";
    const classNav = document.querySelector(".classNav");
    classNav.style.height = (clientH / clientW) * 100 - 13.3 + "vw";
    smile.style.height = (clientH / clientW) * 100 - 13.3 + "vw";
    this.file = document.querySelector(".file");
    this.file.addEventListener("change", e => {
      this.setState({
        file: e.target.files[0]
      });
      const fr = new FileReader();
      fr.onloadend = e => {
        console.log(e.target.result);
        this.setState({
          imgSrc: e.target.result
        });
      };
      fr.readAsDataURL(e.target.files[0]);
    });
  }
  inputChange(e, target) {
    this.setState({
      [target]: e.target.value
    });
  }
  cancle() {
    console.log(123);
    this.setState({
      isShow: 0
    });
  }
  sureRedirect() {
    const openid = sessionStorage.getItem("openid");
    window.location.href = `https://wx.idsbllp.cn/MagicLoop/index.php?s=/addon/Bind/Bind/bind/openid/${openid}/token/gh_68f0a1ffc303`;
  }

  submit() {
    const { nickname, file, declare } = this.state;
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("descp", declare);
    formData.append("image", file);
    this.setState({
      isLoading: true
    });
    if (file === "") {
      api
        .uploadNoFile({
          nickname: nickname,
          descp: declare
        })
        .then(res => {
          this.setState({
            isLoading: false
          });
          alert("上传成功");
          sessionStorage.setItem("smile_info", JSON.stringify(res.data.data));
        });
    } else {
      api.upload(formData).then(res => {
        this.setState({
          isLoading: false
        });
        alert("上传成功");
        sessionStorage.setItem("smile_info", JSON.stringify(res.data.data));
      });
    }

    this.setState({
      isShow: 0
    });
  }
  checkForm() {
    const smile_info = sessionStorage.getItem("smile_info");
    const { nickname, file, declare, imgSrc } = this.state;
    let regu = "^[ ]+$";
    let re = new RegExp(regu);
    if (
      nickname.length === 0 ||
      re.test(nickname) ||
      declare.length === 0 ||
      re.test(declare) ||
      (file === "" && imgSrc === "")
    ) {
      alert("内容不能为空");
      return;
    } else {
      if (smile_info !== "null") {
        this.setState({
          isShow: 1
        });
      } else {
        this.submit();
      }
    }
  }
  render() {
    const { isShow } = this.state;
    const style1 = isShow === 0 ? { display: "flex" } : { display: "none" };
    const style2 = isShow === 1 ? { display: "block" } : { display: "none" };
    const style3 = isShow === 2 ? { display: "block" } : { display: "none" };
    const style4 = isShow === 3 ? { display: "flex" } : { display: "none" };
    return (
      <div className="smile">
        {this.state.isLoading ? <Loading /> : null}
        <div className="smile-content clearfix" style={style1}>
          <h2 className="show-pic">
            <i />
            <span>晒一晒</span>
          </h2>
          <div className="add-pic">
            <input type="file" className="file" />
            <div className="add-pic-icon">+</div>
            <div className="add-pic-text">晒过后就可以点赞了~</div>
            {this.state.imgSrc ? <img src={this.state.imgSrc} /> : null}
          </div>
          <div className="nickName">
            <i />
            <span>昵称</span>
            <input
              type="text"
              placeholder="限5字内"
              maxLength="5"
              className="nickName-input"
              value={this.state.nickname}
              onChange={e => {
                this.inputChange(e, "nickname");
              }}
            />
          </div>
          <div className="declaration">
            <i />
            <span>大学宣言</span>
            <textarea
              type="text"
              placeholder="限20字内"
              className="declaration-input"
              maxLength="20"
              rows="3"
              cols="20"
              value={this.state.declare}
              onChange={e => this.inputChange(e, "declare")}
            />
          </div>
          <button className="upLoad" onClick={this.checkForm}>
            上传
          </button>
        </div>

        <div className="mask" style={style2}>
          <div className="mask-content">
            <div className="mask-content-img" />
            <div className="mask-content-text">
              每个人只能晒一张照片，之前晒过 的照片将被会覆盖。是否继续？
            </div>
            <div className="mask-make-sure">
              <div className="mask-sure" onClick={this.submit}>
                确定
              </div>
              <div className="mask-false" onClick={this.cancle}>
                取消
              </div>
            </div>
          </div>
        </div>

        <div className="mask" style={style3}>
          <div className="mask-content">
            <div className="mask-content-img" />
            <div className="mask-content-text">
              只有绑定用户才能晒照，是否跳转绑定?
            </div>
            <div className="mask-make-sure">
              <div className="mask-sure" onClick={this.sureRedirect}>
                确定
              </div>
              <div className="mask-false" onClick={this.cancle}>
                取消
              </div>
            </div>
          </div>
        </div>

        <div className="classNav" style={style4}>
          <div className="classNav-img" />
          <div className="classNav-text">
            只有萌新才能晒照哦
            <br />
            &nbsp;快去给他们点赞吧
          </div>
        </div>
      </div>
    );
  }
}

export default Smile;
