import React, { Component } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import {connect} from "react-redux"
// import loadable from "@loadable/component";
import {windowWidth as windowAction} from "@/redux/common/action.js"
import api from "../../api/api";
import "./index.scss";

import ScrollToTop from "../../components/ScrollToTop";
import Header from "./components/Header/index";

import ArticleList from "../home/home";
import ArticleContent from "../article/article";
import Archive from "../archive/index";
import Tag from "../tag/index";
import Timeline from "@/view/timeline/index"
import NotFound from "../../components/404/index";

// const ArticleList = loadable(() => import("../list/list"));
// const ArticleContent = loadable(() => import("../article/article"), {
//   fallback: Loading,
// });
// const Archive = loadable(() => import("../archive/index"));
// const Tag = loadable(() => import("../tag/index"));
// const NotFound = loadable(() => import("../../components/404/index"));
// let { path, url } = useRouteMatch();

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // this.getTags();
    // this.getArticlesList();
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
 
  render() {

    return (
      <div id="container" className="container">
        <div
          style={{
            height: 60,
            width: "100%",
            // position: "sticky",
            // position: "-webkit-sticky",

            // top: '5px',
            // zIndex: 10,
            backgroundColor: "#FFF"
          }}
        >
          <Header {...this.props} />
        </div>
        <ScrollToTop>
          <Switch>
            <Route exact path="/article/:id" component={ArticleContent} />
            <Route exact path="/archive" component={Archive} />
            <Route exact path="/tag/:tag" component={Tag} />
            <Route exact path={`/search/:search`} component={ArticleList} />
            <Route exact path={`/timeline/:time`} component={Timeline} />
            <Route exact path="/" component={ArticleList} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ScrollToTop>
      </div>
    )
  }
}

export default connect(state=>({windowWidth:state.common.windowWidth}))(Index)
