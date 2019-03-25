import React, { Component } from "react";
import { Divider } from "antd";
import Loading from "../../components/Loading";
import author_img from "../../assets/author.svg";
import time_img from "../../assets/time.svg";
import comment_img from "../../assets/comment.svg";
import { translateMarkdown } from "../../util/util";
import "./article.scss";

import Anchor from "./anchor";
import api from "../../api/api";
export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      loading: true,
      id: ""
    };
  }
  componentDidMount() {
     console.log("props23123",this.props)
    var id = this.props.match.params.id;
    // var id = this.props.location.state.id
    this.getArticle(id);
  }
  componentWillReceiveProps(nextprops) {
    var id = nextprops.match.params.id;
    //  var id = this.props.location.state.id
    if (id === this.state.id) {
      return;
    }
    this.getArticle(id);
  }
  getArticle(id){
    this.setState({
      loading: true
    });
    api
      .post("article/getArticle", {
        id: id
      })
      .then(res => {
        this.setState({
          id: id,
          article: res.data,
          loading: false
        });
      });
  };

  render() {
    let { article, loading } = this.state;
    let content;
    if (article) {
      content = translateMarkdown(article.content);
    }
    return loading ? (
      <Loading />
    ) : (
      <div className="article-detail">
        <div style={{ borderRight: "solid #e8e8e8 1px", flex: 1 }}>
          <div className="content_header">
            <div className="">{article.title}</div>
            <div className="articleInfo">
              <div className="item">
                <img alt="" src={author_img} />
                <span>{article.author}</span>
              </div>
              <div className="item">
                <img alt="" src={time_img} />
                <span>{article.updateTime.slice(0, 10)}</span>
              </div>
              <div className="item">
                <img alt="" src={comment_img} />
                <span>暂无评论</span>
              </div>
            </div>
          </div>
          <div className="markdown-body editormd-html-preview"  dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>

        <div className="sider_left">
          <Divider orientation="left">总览</Divider>
          <Anchor content={content} />
        </div>
      </div>
    );
  }
}
