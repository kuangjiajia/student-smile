import elegant from "./images/elegant-icon.png";
import elegantChoose from "./images/elegant-icon-choose.png";
import smile from "./images/smile-icon.png";
import smileChoose from "./images/smile-icon-choose.png";
import classIcon from "./images/class-icon.png";
import classIconChoose from "./images/class-icon-choose.png";

export const LinkConfig = {
  elegant: {
    to: "/elegant/newest",
    text: "风采展示",
    icon: elegant,
    iconChoose: elegantChoose
  },
  smile: {
    to: "/smile",
    text: "新生笑脸",
    icon: smile,
    iconChoose: smileChoose
  },
  classNav: {
    to: "/classNav",
    text: "我的班级",
    icon: classIcon,
    iconChoose: classIconChoose
  }
};

export const elegantConfig = {
  newest: {
    to: "/elegant/newest",
    text: "班级墙",
    value: "newest"
  },
  hotest: {
    to: "/elegant/hotest",
    text: "排行榜",
    value: "hotest"
  }
};

const rootShema = "https://wx.idsbllp.cn/orientation-plus";
// export const rootShema = "http://kuangjiajia.natapp1.cc/orientation-plus";
// export const yuming = "http://localhost:3000";
export const yuming = "https://wx.idsbllp.cn/game/smile";
export const apiConfig = {
  upLoad: {
    method: "POST",
    url: `${rootShema}/stu/upload`,
    headers: { "Content-Type": "multipart/form-data" }
  },
  info: { method: "GET", url: `${rootShema}/stu/info` },
  classList: { method: "GET", url: `${rootShema}/class/list` },
  classInfor: { method: "GET", url: `${rootShema}/class/list/info` },
  vote: {
    method: "POST",
    url: `${rootShema}/stu/vote`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  },
  search: { method: "GET", url: `${rootShema}/class/search` },
  upLoadNofile: {
    method: "POST",
    url: `${rootShema}/stu/modify`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }
};
