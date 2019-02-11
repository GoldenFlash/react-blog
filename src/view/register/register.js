import React, { Component } from "react";
import axios from "axios";
import { Popover, Button } from "antd";

import "./register.scss";
import api from "../../api/api";
import add_img from "../../assets/new.svg";
import page_img from "../../assets/page.svg";
import set_img from "../../assets/set.svg";
import edite_img from "../../assets/edite.svg";
import delete_img from "../../assets/delete.svg";
export default class article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PopoverShow: true,
      addNewCollectedWorks: false,
      collectionTitle: "",
      collectedWorks: [
        {
          title: "日记本"
        },
        {
          title: "随笔"
        }
      ],
      articleList: [
        {
          title: "2019-1-28"
        }
      ]
    };
  }
  componentDidMount() {}
  register = () => {
    api.post("/users/register", {
      nickName: this.state.nickName,
      account: this.state.account,
      passWord: this.state.passWord
    }).then(res=>{
        console.log(res)
    })
  };
  render() {
    return (
      <div>
        <div className="registerContainer">
          <input placeholder="昵称" type="text" />
          <input placeholder="邮箱 或手机号" type="text" />
          <input placeholder="密码" type="text" />
          <Button onClick={this.register} style={{ marginTop: "50px" }}>
            注册
          </Button>
        </div>
      </div>
    );
  }
}
