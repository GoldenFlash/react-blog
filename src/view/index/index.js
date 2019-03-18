import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import api from "../../api/api";
import "./index.scss";

import Loading from "../../components/Loading"
import ArticleList from "../list/list"
import ArticleContent from '../article/article'
import Archive from "../archive/index"
import SideNav from "./components/sideNav/index"
import Header from "./components/Header/index"
import Tag from "../tag/tag"
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
    };
  }
  componentDidMount() {
    this.getTags()
    this.getArticlesList()
    
    console.log("componentDidMount");
  }
  toHome() {
    this.props.history.replace("/home")
  }
 
  getArticlesList() {
    api.post("article/getHotArticle").then(res => {
      console.log("getArticlesList", res);
      if (res.data) {
        this.setState({
          articleList: res.data
        });
      }
    });
  }
  getTags() {
    api.get("tags/getTags").then(res => {
      this.setState({
        tags: res.data
      })
    })
  }

  render() {
    var latestArticle = this.state.articleList && this.state.articleList.slice(0, 3)
    return (
      <div className="page">
        {this.state.articleList && this.state.tags ?
          <div className="container">

            <Header></Header>

            <div className="content">

              <SideNav latestArticle={latestArticle} tags={this.state.tags}></SideNav>

              <article className="article-wrapper" id="scroll_html">
                <Route exact path="/home" component={ArticleList}></Route>
                <Route path="/home/content" component={ArticleContent}></Route>
                <Route path="/home/archive" component={Archive}></Route>
                <Route path="/home/tag" component={Tag}></Route>
              </article>

            </div>
          </div> : <Loading />}
      </div>
    );
  }
}
