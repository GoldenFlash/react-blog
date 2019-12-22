import React from "react"
import {List} from "antd"
import author_img from "../../../../assets/author.svg";
import time_img from "../../../../assets/time.svg";
import comment_img from "../../../../assets/comment.svg";
import view_img from "../../../../assets/view.svg";
import { Link } from "react-router-dom"
import marked from "marked";
import { translateMarkdown } from "../../../../util/util";

import './style.scss'


export default function ArticleList(props) {
    let list = props.list
    var HTMLtag = new RegExp("<.+?>", "g");
    function navigate(item) {
        props.history.push(`/article/${item._id}`)
    }
    return (
        <div className="articalList">

        {
            list.map((item, i) => {
                //   let content = translateMarkdown(item.content.substr(0, 300))
                return (
                    // {marked(item.content).replace(HTMLtag, "").substr(0, 300)}
                    <div key={i} onClick={navigate.bind(this, item)} className="artical">
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
                    </div>

                );
            })
        }
        </div>
    )
}