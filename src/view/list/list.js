import React, { Component } from 'react';
import { Link } from "react-router-dom"
import marked from "marked";
import { Divider, List, Menu, Spin } from "antd"
import './list.scss'
import Loading from "../../components/Loading"
import author_img from "../../assets/author.svg";
import time_img from "../../assets/time.svg";
import comment_img from "../../assets/comment.svg";
import view_img from "../../assets/view.svg";
import api from "../../api/api";
// import { link } from 'fs';

// const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class ArticalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
            loading: false
        }
    }
    componentDidMount() {
        this.getArticlesList()
    }
    viewArticle(item) {
        this.props.history.push("/home/content", {
            article: item
        });
    }
    getArticlesList() {
        this.setState({
            loading:true
        })
        api.post("article/getHotArticle").then(res => {
            console.log("getArticlesList", res);
            if (res.data) {
                this.setState({
                    articleList: res.data,
                    loading: false
                });
            }
        });
    }
    render() {
        let { loading } = this.state
        var HTMLtag = new RegExp("<.+?>", "g");
        return (

            loading ? <Loading /> :
                <div style={{display:"flex",minHeight:"100vh",paddingTop:60}}>
                    <div className="articalList">
                        {this.state.articleList.map((item, i) => {
                            return (
                                <div onClick={this.viewArticle.bind(this, item)} key={i} className="artical">
                                    <div style={{ flex: 1 }}>
                                        <div>
                                            <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                                                {item.title}
                                            </span>
                                        </div>
                                        <div className="content_wrapper">
                                            {marked(item.content).replace(HTMLtag, "").substr(0,300)}
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
                                                <span>{item.creatTime.slice(0, 10)}</span>
                                            </div>
                                            <div className="item">
                                                <img alt=""
                                                    src={comment_img}
                                                />
                                                <span>暂无评论</span>
                                            </div>
                                            <div className="item">
                                                <img alt=""
                                                    src={view_img}
                                                />                                            <span>{item.view}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="image" style={{ backgroundImage: `url(${item.image})` }} />

                                </div>
                            );
                        })}
                    </div>

                    <div className="rightNav">
                        <div className="sideTitle">
                            <Divider orientation="left">热门文章</Divider>
                            <ul>
                                {this.state.articleList.slice(0, 5).map((item, index) =>
                                    <li key={index}>
                                        <Link to={{ pathname: "/home/content", state: { article: item } }} state={item}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}
