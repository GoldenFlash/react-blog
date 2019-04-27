import React,{Component} from 'react';
import SimpleMDE from "easymde"
// import 'simplemde/src/css/simplemde.css'
import 'simplemde/dist/simplemde.min.css'

import {translateMarkdown} from "@/util/util"
import api from "@/api/api.js"
import "./edite.scss"
export default class Edite extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentDidMount(){
        console.log("Props",this.props)
        this.initEditor()
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps", nextProps)
        this.getArticle(this.props.match.params.id)
        
    }
    initEditor=()=>{
        this.simplemde = new SimpleMDE({ 
            element: document.getElementById("editor"),
            // autofocus: true,
            // autosave: true,
            previewRender: translateMarkdown
        });
    }
    getArticle(id) {
        this.setState({
            loading: true
        });
        api
            .post("article/getArticle", {
                id: id
            })
            .then(res => {
                console.log("res",res)
                this.simplemde.value(res.data.content)
                this.setState({
                    id: id,
                    article: res.data,
                    loading: false
                });
            });
    };
    render(){
        return(
            <div>
                <textarea id="editor" value={this.state.article}></textarea>
                {this.props.match.params&&this.props.match.params.id}
            </div>
        )
    }
}