import React, { Component } from 'react';
import { Spin } from "antd"
import Loading from "../../components/Loading"
// import marked from 'marked'
import author_img from "../../assets/author.svg";
import time_img from "../../assets/time.svg";
import comment_img from "../../assets/comment.svg";
import { translateMarkdown } from "../../util/util"
import "./article.scss"

import SiderLeft from "./conpoments/sideLeft/index"

export default class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            loading: false
        }
    }

    initmarkdownView = (props) => {
        var content = this.props.location.state.article.content
        this.EditormdView = window.editormd.markdownToHTML("editormd-view", {
            markdown: content, //+ "\r\n" + $("#append-test").text(),
            //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
            //htmlDecode      : "style,script,iframe",  // you can filter tags decode
        });
    }
    render() {
        let { article } = this.props.location.state
        let { loading } = this.state
        let content = translateMarkdown(article.content)
        return (
            loading ? <Loading /> :
                <div className="article-detail">
                    <div>
                        <div className="header">
                            <div className="">{article.title}</div>
                            <div className="articleInfo">
                                <div className="item">
                                    <img alt=""
                                        src={author_img}
                                    />
                                    <span>{article.author}</span>
                                </div>
                                <div className="item">
                                    <img alt=""
                                        src={time_img}
                                    />
                                    <span>{article.updateTime.slice(0, 10)}</span>
                                </div>
                                <div className="item">
                                    <img alt=""
                                        src={comment_img}
                                    />
                                    <span>暂无评论</span>
                                </div>
                            </div>
                        </div>
                        <div className="markdown-body editormd-html-preview" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                    <SiderLeft></SiderLeft>
                    {/* <div id="editormd-view" >
                        <textarea style={{display:"none"}}  name="test-editormd-markdown-doc">###Hello world!</textarea>   
                    </div> */}
                </div>
        );
    }
}
