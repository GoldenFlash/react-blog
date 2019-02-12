import React, { Component } from "react";
import axios from "axios";
import { Popover, Button } from "antd";

import "./register.scss";
import api from "../../api/api";
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
  componentDidMount() {
   console.log( this.props.location.state.type)
  }
  register = () => {
    api.post("/users/register", {
      nickName: this.state.nickName,
      account: this.state.account,
      passWord: this.state.passWord
    }).then(res=>{
        console.log(res)
    })
  };
  login = () => {
    api.post("/users/login", {
      account: this.state.account,
      passWord: this.state.passWord
    }).then(res=>{
        console.log(res)
        console.log("cookie",document.cookie)
    })
  };
  textInput=(e,type)=>{
    console.log(e)
    this.setState({
      [type]:e.target.value
    })
  }
  renderRegister(){
    return(
      <div className="registerContainer">
          <input onInput={(e)=>{this.textInput(e,"nickName")}} placeholder="昵称" type="text" />
          <input onInput={(e)=>{this.textInput(e,"account")}} placeholder="邮箱 或手机号" type="text" />
          <input onInput={(e)=>{this.textInput(e,"passWord")}} placeholder="密码" type="text" />
          <Button onClick={this.register} style={{ marginTop: "50px" }}>
            注册
          </Button>
        </div>
    )
  }
   renderLogin(){
    return(
      <div className="registerContainer">
          <input onInput={(e)=>{this.textInput(e,"account")}} placeholder="邮箱 或手机号" type="text" />
          <input onInput={(e)=>{this.textInput(e,"passWord")}} placeholder="密码" type="text" />
          <Button onClick={this.login} style={{ marginTop: "50px" }}>
            登录
          </Button>
        </div>
    )
  }
  render() {
    return (
      <div>
        {this.props.location.state.type==="register"&&this.renderRegister()}
        {this.props.location.state.type==="login"&&this.renderLogin()}
      </div>
    );
  }
}
