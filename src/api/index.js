import Server from "../utils/server.js";
import { apiConfig } from "../config/index.js";
import axios from "axios";

class API extends Server {
  constructor(props) {
    super(props);
  }
  upload(params) {
    return new Promise((resolve, reject) => {
      axios({
        method: apiConfig.upLoad.method,
        url: apiConfig.upLoad.url,
        headers: apiConfig.upLoad.headers,
        data: params
      }).then(res => resolve(res));
    });
  }
  async getUserInfo() {
    return this.axios(apiConfig.info.method, apiConfig.info.url);
  }
  async getClassList(params) {
    return this.axios(
      apiConfig.classList.method,
      apiConfig.classList.url,
      params
    );
  }
  async getClassInfor(params) {
    return new Promise((resolve, reject) => {
      this.axios(
        apiConfig.classInfor.method,
        apiConfig.classInfor.url,
        params
      ).then(res => resolve(res));
    });
  }
  goodClick(params) {
    return new Promise((resolve, reject) => {
      this.axios(
        apiConfig.vote.method,
        apiConfig.vote.url,
        params,
        apiConfig.vote.headers
      ).then(res => resolve(res));
    });
  }
  searchText(params) {
    return new Promise((resolve, reject) => {
      this.axios(apiConfig.search.method, apiConfig.search.url, params).then(
        res => resolve(res)
      );
    });
  }
  uploadNoFile(params) {
    return new Promise((resolve, reject) => {
      this.axios(
        apiConfig.upLoadNofile.method,
        apiConfig.upLoadNofile.url,
        params
      ).then(res => resolve(res));
    });
  }
}

export default new API();
