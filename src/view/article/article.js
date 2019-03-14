import React, { Component } from 'react';
import author_img from "../../assets/author.svg";
import time_img from "../../assets/time.svg";
import comment_img from "../../assets/comment.svg";
// import marked from "marked";
// import {translateMarkdown} from "../../util/util.js"
import "./article.scss"

export default class Article extends Component {
    constructor(props){
        super(props)
        this.state={
            content:""
        }
    }
    componentDidMount(){
        // console.log("this.props",this.props)
        this.initmarkdownView()

    }
    initmarkdownView(){

        var content = this.props.location.state.article.content

        var EditormdView = window.editormd.markdownToHTML("editormd-view", {
            markdown        : content ,//+ "\r\n" + $("#append-test").text(),
            //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
            //htmlDecode      : "style,script,iframe",  // you can filter tags decode
            
        });
   

    }
    render() {
        let {article} = this.props.location.state
           // console.log("title",title)
        
        return (
            <div className="article-detail">  
                
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
                 <div id="editormd-view">
                   <textarea style={{display:"none"}}  name="test-editormd-markdown-doc">###Hello world!</textarea>               
                
                </div>
                
                
                
            </div>
        );
    }
}
// export default Article;
