import React, { Component } from "react";
// import { Link } from "react-router-dom";

import "./index.scss";
import home_img from "../../assets/home.svg";
import lingdang_img from "../../assets/lingdang.svg";
import search_img from "../../assets/search.svg";

import DropdownMenu from "../../components/Dropdown_menu";
import api from "../../api/api";
// import util from "../../util/util"
import { Route} from "react-router-dom";
import ArticleList from "../list/list"
import ArticleContent from '../article/article'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarStyle: {},
      articleList: [],
      latest: [
        { title: "koa2-基础知识" },
        { title: "canvas" },
        { title: "flex 布局" },
        { title: "[转] JavaScript深入之继承的多种方式和优缺点" },
        { title: "[转] JavaScript深入之创建对象的多种方式以及优缺点" }
      ],
      labels: [
        "canvas", "CSS", "ES6", "flex", "HTTP", "Javascript", "Javascript",
        "MVVM", "MySQL", "node", "React", "React-Router", "regexp", "Sequelizethistools",
        "Vue", "webpack", "作用域原型原型链执行上下文"
      ],
      labelsClass: [
        "ant-tag-magenta",
        "ant-tag-blue",
        "ant-tag-red",
        "ant-tag-volcano",
        "ant-tag-orange",
        "ant-tag-gold",
        "ant-tag-lime",
        "ant-tag-green",
        "ant-tag-cyan",
        "ant-tag-geekblue",
        "ant-tag-purple",
        "ant-tag-lime"
      ]

    };
  }
  componentDidMount() {
    console.log("this.props", this.props.children)
    if (document.cookie) {
      var userInfo = {}
      var cookies = document.cookie.split(";")

      cookies.forEach((item) => {
        var arr = item.split("=")
        userInfo[arr[0].trim()] = arr[1]
      })

      this.setState({
        userInfo: userInfo,
        login: true
      })

    }
    // this.getArticlesList();
    console.log("componentDidMount");
  }
  sidebarFixed(parent, el) {
    var parentel = document.getElementsByClassName(parent)[0];
    var sidebar = document.getElementsByClassName(el)[0];
    var parentelheight = parentel.offsetHeight;
    var sidebarheight = sidebar.offsetHeight;

    parentel.addEventListener('scroll', () => {
      var scolltop = parentel.scrollTop;
      var positionTop = parentelheight + scolltop - sidebarheight
      console.log('positionTop', positionTop)
      console.log('scolltop', scolltop)
      if ((sidebarheight - parentelheight) <= scolltop) {
        this.setState({
          sidebarStyle: {
            position: "absolute",
            right: 0,
            top: positionTop + 'px'
          }
        })
      }
    });
  }
  toHome(){
    this.props.history.replace("/home/articleList")
  }
  handerMenuClick = value => {
    console.log("navigate", value);
    if (value === "退出") {
      api.post("/blog/users/logout").then(res => {
        console.log(res);
        this.props.history.replace("/register", {
          type: "login"
        });
      });
    }
  };
  toEdite = () => {
    if (this.state.login) {
      this.props.history.push("/edite");
    } else {
      this.props.history.push("/register", {
        type: "login"
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
  getArticlesList() {
    api.post("/blog/article/getHotArticle").then(res => {
      console.log("getArticlesList", res);
      if (res.data) {
        this.setState({
          articleList: res.data
        });
      }
    });
  }
  renderHeader() {
    return (
      <header>
        <div className="titleBar">
          <div onClick={this.toHome.bind(this)} className="titleBar_left">
            <img alt=""
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
              <img alt=""
                src={search_img}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
          {this.state.login ? (
            <div className="titleBar_login">
              <DropdownMenu
                style={{ height: "100%" }}
                onClick={this.handerMenuClick}
                menu={["我的主页", "设置", "退出"]}
                placement="bottomLeft"
              >
                <div className="menu_container menu_hover">
                  <span>菜单</span>
                </div>
              </DropdownMenu>
            </div>
          ) : (
              <div className="titleBar_login">
                <img alt=""
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

          <div className="editeArtical" onClick={this.toEdite}>
            <img alt=""
              src={lingdang_img}
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            {/* <Link to="article"> */}
            <span> 写文章</span>
            {/* </Link>     */}
          </div>
        </div>
      </header>
    )
  }
  renderLeftNav() {
    return (
      <div className="leftNav">
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <img alt="" style={{ width: 130, height: 130, borderRadius: "50%" }} src="https://avatars0.githubusercontent.com/u/26805558?s=460&v=4" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 26, fontWeight: "600" }}>{this.state.userInfo && this.state.userInfo.nickName}</div>
          <div style={{ fontSize: 12, color: "#8590a6", marginTop: 10 }}>前端打杂人员，略微代码洁癖</div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}>最近文章</div>
          <div className="wrapper">
            {this.state.latest && this.state.latest.map((item, i) => {
              return <div key={i} className="latestArticle">{item.title}</div>
            })}
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}>标签</div>
          <div className="lables ">
            {this.state.labels && this.state.labels.map((item, i) => {
              return <div key={i} className={`item ant-tag ${this.state.labelsClass[Math.ceil(Math.random() * 12)]}`}>{item}</div>
            })}
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="page">
        <div className="container">
          {this.renderHeader()}
          <div className="content">
            {this.renderLeftNav()}
            <article className="article-wrapper">
              <Route   path="/home/articleList" component={ArticleList}></Route>
              <Route path="/home/articleContent" component={ArticleContent}></Route>
            </article>
          </div>
        </div>
      </div>
    );
  }
}