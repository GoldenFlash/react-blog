import React, { PureComponent } from 'react';
// import SimpleMDE from "easymde"
// import 'simplemde/src/css/simplemde.css'
// import 'simplemde/dist/simplemde.min.css'
// import MdEditor from 'react-markdown-editor-lite'
import Loading from "../../../components/Loading"
import { message, Button,Empty} from "antd"
// import { translateMarkdown } from "@/util/util"
import api from "@/api/api.js"
import "./edite.scss"
export default class Edite extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            article: this.props.article||{}
        }
    }
    componentDidMount() {
        this.initEditor(this.props.article)
    }
   
    componentWillReceiveProps(nextProps) {
        if (nextProps.article._id !== this.props.article._id) {
            // console.log("0000000", nextProps.article)
            this.setState({
                title: nextProps.article.title
            })
            this.initEditor(nextProps.article)
        }
    }
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log("nextProps222", nextProps,this.props)
    //     if(nextProps.article._id!==this.props.article._id){
    //         return true
    //     }
    //     return false
    // }
    componentWillUpdate(nextProps,nextState){
        
    }
    removeEditor(){
        this.editor.editor.remove()
        this.editor = ""
    }
    onInput = (e) => {
        var text = e.target.value
        console.log(e.target.value);
       
        // var checkedArticle = this.state.checkedArticle;
        // checkedArticle.title = e.target.value;
        this.setState({
            title: text
        });
    }
    initEditor = (article) => {
        this.editor = window.editormd("editormd_container", {
            // path: "/blog/lib/editor.md-master/lib/",
            path: "/lib/editor.md-master/lib/",
            width: "100%",
            height: "100%",
            syncScrolling: "single",
            saveHTMLToTextarea: true
        }); 
    }
    getArticle(id) {
        this.setState({
            loading: true
        });
        this.testEditor = ""
        api
            .post("article/getArticle", {
                id: id
            })
            .then(res => {
                console.log("res", res)
                // this.testEditor.value= res.data.content
              
                this.setState({
                    id: id,
                    article: res.data,
                    loading: false
                },()=>{
                    this.initEditor()
                });
            });
    };
    saveArticle() {
        var article = this.props.article;
        var content = this.testEditor.getMarkdown();
        var title = this.state.title
        if(this.props.onTitleChange){
            this.props.onTitleChange(title)
        }
        api
            .post("article/saveArticle", {
                id: article._id,
                collectionId: article.collectionId,
                title: title,
                content: content
            })
            .then(res => {
                console.log("res", res);
                if (res.err) {
                    message.error("保存失败");
                } else {
                    message.success("保存成功");
                }
            });
    }
    publishArticle() {
        var article = this.props.article;
        var content = this.testEditor.getMarkdown();
        var title = this.state.title
        if(this.props.onTitleChange){
            this.props.onTitleChange(title)
        }
        api
            .post("article/publishArticle", {
                id: article._id,
                collectionId: article.collectionId,
                title:title,
                content: content
            })
            .then(res => {
                if (res.err) {
                    message.error("发布失败");
                } else {
                    message.success("发布成功");
                }
            });
    }
    render() {
        var content = this.props.article.content
        console.log("11232313",this.props)
        return (
           
           <div className="wrapper">
           
                {(content||content==="")&&<div className="title">
                    <input
                        onChange={()=>{}}
                        onInput={this.onInput}
                        className="title_input"
                        value={this.state.title}
                        type="text"
                    />
                    <div className="publish">
                        <Button onClick={this.saveArticle.bind(this)}>保存</Button>
                        <Button onClick={this.publishArticle.bind(this)} style={{ marginLeft: 10 }}> 发布</Button>
                    </div>
                </div>}
                <div style={{ flex: 1, overflow: "hidden" }}>
                    {this.state.loading && <Loading></Loading>}
                    <div id="editormd_container" style={{ width: "100%" }}>
                        <textarea onChange={()=>{}} style={{ display: "none" }} value={content || ""}></textarea>
                    </div>
                </div>
            </div>
            // :<Empty></Empty>    
        )
    }
}