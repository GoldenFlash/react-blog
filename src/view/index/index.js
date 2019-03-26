import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

import api from "../../api/api";
import "./index.scss";

import ScrollToTop from "../../components/ScrollToTop";
import SideNav from "./components/sideNav/index";
import Header from "./components/Header/index";
import Loading from "../../components/Loading";
// import ArticleContent from "../article/article";

const ArticleList = loadable(() => import("../list/list"));
const ArticleContent = loadable(() => import("../article/article"), {
  fallback: Loading,
});
const Archive = loadable(() => import("../archive/index"));
const Tag = loadable(() => import("../tag/index"));
const NotFound = loadable(() => import("../../components/404/index"));

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getTags();
    this.getArticlesList();
  }
  toHome() {
    this.props.history.replace("/home");
  }
  getArticlesList() {
    api.post("article/getHotArticle").then(res => {
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
          <div style={{ position: "absolute", top: 0 }}>
            <SideNav latestArticle={latestArticle} tags={this.state.tags} />
          </div>
          <article className="article-wrapper">
            <ScrollToTop>
              <Switch>
                <Route exact path="/article/:id" component={ArticleContent} />
                <Route exact path="/archive" component={Archive} />
                <Route exact path="/tag" component={Tag} />
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
