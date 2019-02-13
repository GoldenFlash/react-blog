import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {Button} from 'antd';

import "./index.scss";
import home_img from "../../assets/home.svg";
import lingdang_img from "../../assets/lingdang.svg";
import search_img from "../../assets/search.svg";
import Dropdown_menu from "../../components/Dropdown_menu";
import api from "../../api/api";
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (document.cookie) {
      this.setState({
        login: true
      });
    }
    console.log("componentDidMount");
  }
  handerMenuClick = value => {
    console.log("navigate", value);
    if(value==="退出"){
        api.get("/users/logout").then((res)=>{
            console.log(res)
            this.props.history.replace("/register",{
                type:"login"
            })
        })
    }
  };
  toArticle = () => {
    if(this.state.login){
        this.props.history.push("/article");
    }else{
        this.props.history.push("/register",{
            type:"login"
        });
    }
  };
  toRegister = () => {
    this.props.history.push("/register", {
      type: "register"
    });
  };
  toLogin = () => {
    this.props.history.push("/register", {
      type: "login"
    });
  };
  render() {
    return (
      <div className="page">
        <div className="container">
          <header>
            <div className="titleBar">
              <div className="titleBar_left">
                <img
                  style={{ width: "25px", height: "25px", marginRight: "10px" }}
                  src={home_img}
                />
                <span style={{ fontSize: "20px" }}>博客</span>
              </div>
              <div className="titleBar_middle">
                {/* <span>搜索</span> */}
                <input
                  className="titleBar_input"
                  type="text"
                  placeholder="输入关键词搜索..."
                />
                <div className="titleBar_search">
                  <img
                    src={search_img}
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </div>
              {this.state.login ? (
                <div className="titleBar_login">
                  <Dropdown_menu
                    style={{ height: "100%" }}
                    onClick={this.handerMenuClick}
                    menu={["我的主页", "设置", "退出"]}
                    placement="bottomLeft"
                  >
                    <div className="menu_container menu_hover">
                      <span>菜单</span>
                    </div>
                  </Dropdown_menu>
                </div>
              ) : (
                <div className="titleBar_login">
                  <img
                    src={lingdang_img}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px"
                    }}
                  />
                  <span onClick={this.toLogin} style={{ cursor: "pointer" }}>
                    登录
                  </span>
                  <span
                    onClick={this.toRegister}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  >
                    注册
                  </span>
                </div>
              )}

              <div className="editeArtical" onClick={this.toArticle}>
                <img
                  src={lingdang_img}
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                {/* <Link to="article"> */}
                <span> 写文章</span>
                {/* </Link>     */}
              </div>
            </div>
          </header>
          <nav>
            <div className="navBar">
              <div className="navBar_home">
                <span>首页</span>
              </div>
              <div className="navBar_classcify">
                <span>分类</span>
              </div>
              <div className="navBar_pages">
                <span>页面</span>
              </div>
            </div>
          </nav>
          <section>
            <div className="signature">
              <div>
                <span>标题</span>
              </div>
              <div className="signText">
                <span>若多年后无所作为，韶华青春何止辜负丶</span>
              </div>
            </div>
          </section>
          <article>
            <div className="articalList">
              <div className="artical">
                <div className="artical_image" />
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}
