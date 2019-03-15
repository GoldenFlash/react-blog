import React, { Component } from 'react';
import marked from "marked";
import './list.scss'

import author_img from "../../assets/author.svg";
import time_img from "../../assets/time.svg";
import comment_img from "../../assets/comment.svg";
import api from "../../api/api";
export default class ArticalList extends Component {
    constructor(props){
        super(props)
        this.state={
            articleList:[]
        }
    }
    componentDidMount(){
        this.getArticlesList()
    }
    viewArticle(item){
        this.props.history.push("/home/content", {
            article:item
        });
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
    render() {
        var HTMLtag = new RegExp("<.+?>", "g");
        return (
            <div style={{ display: "flex" }}>
                <div className="articalList">
                    {this.state.articleList.map((item,i) => {
                        return (
                            <div onClick={this.viewArticle.bind(this,item)} key={i} className="artical">
                                <div style={{ flex: 1 }}>
                                    <div>
                                        <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <div className="content_wrapper">
                                        {marked(item.content).replace(HTMLtag, "")}
                                    </div>
                                    <div
                                        style={{ borderBottom: "solid #EEEEEE 1px", margin: 10 }}
                                    />
                                    <div className="articleInfo">
                                        <div className="item">
                                            <img alt=""
                                                src={author_img}
                                            />
                                            <span>{item.author}</span>
                                        </div>
                                        <div className="item">
                                            <img alt=""
                                                src={time_img}
                                            />
                                            <span>{item.updateTime.slice(0, 10)}</span>
                                        </div>
                                        <div className="item">
                                            <img alt=""
                                                src={comment_img}
                                            />
                                            <span>暂无评论</span>
                                        </div>
                                    </div>
                      
                                </div>
                                <div className="image" />

                            </div>
                        );
                    })}
                </div>

                <div style={this.state.sidebarStyle} className="rightNav">

                </div>


            </div>
        )
    }
}