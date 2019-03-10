import React, { Component } from 'react';
import marked from "marked";
import "./article.scss"

export default class Article extends Component {
    constructor(props){
        super(props)
        this.state={
            content:""
        }
    }
    componentDidMount(){
        console.log("this.props",this.props.location.state.article)
    }
    render() {
        return (
            <div className="Article">
                <div dangerouslySetInnerHTML={{ __html: marked(this.props.location.state.article.content)}}> 
                </div>
            </div>
        );
    }
}
// export default Article;
