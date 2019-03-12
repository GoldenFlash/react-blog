import React, { Component } from 'react';
import marked from "marked";
import {translateMarkdown} from "../../util/util.js"
import "./article.scss"

export default class Article extends Component {
    constructor(props){
        super(props)
        this.state={
            content:""
        }
    }
    componentDidMount(){
        // console.log("this.props",this.props.location.state.article)

    }
    render() {
            var content = translateMarkdown(this.props.location.state.article.content)
            console.log("content",content)
        return (
            <div className="article-detail">
                <div dangerouslySetInnerHTML={{ __html: content}}> 
                </div>
            </div>
        );
    }
}
// export default Article;
