import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import loadable from '@loadable/component'

import api from "../../api/api";
import "./index.scss";

import SideNav from "./components/sideNav/index"
import Header from "./components/Header/index"
import Loading from "../../components/Loading"

const ArticleList = loadable(() => import('../list/list'))
const ArticleContent = loadable(() => import('../article/article'))
const Archive = loadable(() => import('../archive/index'))
const Tag = loadable(() => import('../tag/index'))

// import ArticleList from "../list/list"
// import ArticleContent from '../article/article'
// import Archive from "../archive/index"

// import Tag from "../tag/index"
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
        this.state.articleList && this.state.tags ?
          <div className="container">

            <div style={{height:60,width:"100%",position:"absolute",top:0,zIndex:10,backgroundColor:"#FFF"}}>
              <Header { ...this.props}></Header>
            </div>

            <div className="content" >
              <div style={{position:"absolute",top:0}} >
                  <SideNav latestArticle={latestArticle} tags={this.state.tags}></SideNav>
              </div>
              <article className="article-wrapper">
                
                <Switch>
                  <Route path="/content/:id" component={ArticleContent}></Route>
                  <Route path="/archive" component={Archive}></Route>
                  <Route path="/tag" component={Tag}></Route>
                  <Route path="/" component={ArticleList}></Route>
                </Switch>
              </article>

            </div>
          </div> : <Loading />
    );
  }
}
