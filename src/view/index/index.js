import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {connect} from "react-redux"
// import loadable from "@loadable/component";
import {windowWidth as windowAction} from "@/redux/common/action.js"
import api from "../../api/api";
import "./index.scss";

import ScrollToTop from "../../components/ScrollToTop";
import SideNav from "./components/sideNav/index";
import Header from "./components/Header/index";
import Loading from "../../components/Loading";

import ArticleList from "../list/list";
import ArticleContent from "../article/article";
import Archive from "../archive/index";
import Tag from "../tag/index";
import NotFound from "../../components/404/index";

// const ArticleList = loadable(() => import("../list/list"));
// const ArticleContent = loadable(() => import("../article/article"), {
//   fallback: Loading,
// });
// const Archive = loadable(() => import("../archive/index"));
// const Tag = loadable(() => import("../tag/index"));
// const NotFound = loadable(() => import("../../components/404/index"));

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getTags();
    this.getArticlesList();
    this.props.dispatch(windowAction())
    window.onresize = ()=>{
       this.props.dispatch(windowAction())
    }
  }
  toHome() {
    this.props.history.replace("/home");
  }
  getArticlesList() {
    api.get("article/getHotArticle").then(res => {
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
      });
    });
  }
  render() {
    var latestArticle =
      this.state.articleList && this.state.articleList.slice(0, 3);
    return this.state.articleList && this.state.tags ? (
      <div id="container" className="container">
        <div
          style={{
            height: 60,
            width: "100%",
            position: "absolute",
            top: 0,
            zIndex: 10,
            backgroundColor: "#FFF"
          }}
        >
          <Header {...this.props} />
        </div>

        <div className="content">
          {
            this.props.windowWidth>850&&<div style={{ position: "absolute", top: 0 }}>
              <SideNav latestArticle={latestArticle} tags={this.state.tags} />
            </div>
          }
          <article className="article-wrapper" style={{marginLeft:this.props.windowWidth>850?280:0}}>
            <ScrollToTop>
              <Switch>
                <Route exact path="/article/:id" component={ArticleContent} />
                <Route exact path="/archive" component={Archive} />
                <Route exact path="/tag/:tag" component={Tag} />
                <Route exact path="/" component={ArticleList} />
                <Route path="*" component={NotFound} />
              </Switch>
            </ScrollToTop>
          </article>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default connect(state=>({windowWidth:state.common.windowWidth}))(Index)
