import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import marked from "marked";
import { translateMarkdown } from "../../util/util";
import { Divider, List, Menu, Spin } from "antd"
import './list.scss'
import Loading from "../../components/Loading"
import author_img from "../../assets/author.svg";
import time_img from "../../assets/time.svg";
import comment_img from "../../assets/comment.svg";
import view_img from "../../assets/view.svg";
import api from "../../api/api";


class ArticalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
            loading: false
        }
    }
    componentDidMount() {
        this.getArticlesList(this.props.location.search)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search != this.props.location.search) {
            this.getArticlesList(nextProps.location.search)
        }
    }
    navigate(item) {
        this.props.history.push(`/article/${item._id}`)
    }
    getArticlesList(search) {
        this.setState({
            loading: true
        })

        api.get(`article/getHotArticle${search}`).then(res => {
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
        let { loading, articleList, searchList } = this.state
        let { windowWidth } = this.props
        var list = searchList || articleList
        var HTMLtag = new RegExp("<.+?>", "g");
        return (

            loading ? <Loading /> :
            list.length>0?
                <div style={{ display: "flex", minHeight: "100vh", paddingTop: 60 }}>
                    <div className="articalList">
                        {list.map((item, i) => {
                        //   let content = translateMarkdown(item.content.substr(0, 300))
                            return (


                              // {marked(item.content).replace(HTMLtag, "").substr(0, 300)}

                                <div key={i} onClick={this.navigate.bind(this, item)} className="artical">
                                    <div style={{ flex: 1 }}>
                                        <div>
                                            <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                                                {item.title}
                                            </span>
                                        </div>
                                        <div className="content_wrapper">
                                            {marked(item.content).replace(HTMLtag, "").substr(0, 300)}
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
                                                />
                                                <span>{item.view}</span>
                                            </div>
                                        </div>

                                    </div>
                                    {
                                        windowWidth > 580 &&
                                        <div className="image" style={{ backgroundImage: `url(${item.image})` }} />
                                    }
                                </div>

                            );
                        })}
                    </div>

                    {
                        windowWidth > 1100 && <div className="rightNav">
                            <div className="sideTitle">
                                <Divider orientation="left">热门文章</Divider>
                                <ul>
                                    {this.state.articleList.slice(0, 5).map((item, index) =>
                                        <li key={index}>
                                            <Link to={{ pathname: `/article/${item._id}` }} >
                                                {item.title}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    }
                </div>:<div>数据为空</div>
        )
    }
}
export default connect(state => ({ windowWidth: state.common.windowWidth, searchStr: state.common.searchStr }))(ArticalList)
