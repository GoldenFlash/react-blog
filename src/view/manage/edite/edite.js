import React, { PureComponent } from 'react';
// import SimpleMDE from "easymde"
// import 'simplemde/src/css/simplemde.css'
// import 'simplemde/dist/simplemde.min.css'
// import MdEditor from 'react-markdown-editor-lite'
import Loading from "@/components/Loading"
import { message, Button, Empty } from "antd"
import EditableTagGroup from "@/components/editableTags"

// import { translateMarkdown } from "@/util/util"
import api from "@/api/api.js"
import "./edite.scss"
export default class Edite extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            article: this.props.article || {},
        }
    }
    componentDidMount() {
        this.setState({
            title: this.props.article.title
        })
        
        this.initEditor(this.props.article)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.article._id !== this.props.article._id) {
            this.setState({
                title: nextProps.article.title
            })
            this.initEditor(nextProps.article)
        }
    }
    componentWillUpdate(nextProps, nextState) {

    }
    onInput = (e) => {
        var text = e.target.value
        this.setState({
            title: text
        });
    }
    initEditor = (article) => {
        this.editor = window.editormd("editormd_container", {
            path: "/lib/editor.md-master/lib/",
            width: "100%",
            height: "100%",
            syncScrolling: "single",
            saveHTMLToTextarea: true,
            toolbarIcons: function () {
                // Or return editormd.toolbarModes[name]; // full, simple, mini
                // Using "||" set icons align right.
                // return ["undo", "redo", "|", "bold", "hr", "|", "preview", "watch", "|", "fullscreen", "info", "testIcon", "testIcon2", "file", "faicon"]
                return window.editormd.toolbarModes["simple"]
            },
        });
    }
  
    saveArticle() {
        var article = this.props.article;
        var content = this.editor.getMarkdown();
        var title = this.state.title
        if (!title){
            message.error("标题不能为空");
        }
        if (this.props.onTitleChange) {
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
        var content = this.editor.getMarkdown();
        var title = this.state.title
        if (this.props.onTitleChange) {
            this.props.onTitleChange(title)
        }
        api
            .post("article/publishArticle", {
                id: article._id,
                collectionId: article.collectionId,
                title: title,
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
    updateTags = (tag, type) => {
        
        var article = this.props.article
        console.log(tag, article)
        api.post("tags/updateTags", {
            id: article._id,
            collectionId: article.collectionId,
            title: tag,
            type: type
        })
    }
    render() {
        var content = this.props.article.content
        return (
            <div className="edite_wrapper">
                {(content || content === "") &&
                    <div className="e_header">
                        <div className="e_title">
                            <input
                                onChange={() => { }}
                                onInput={this.onInput}
                                className="title_input"
                                value={this.state.title}
                                type="text"
                            />
                            <div className="publish">
                                <Button  type="primary" onClick={this.saveArticle.bind(this)}>保存</Button>
                                <Button style={{backgroundColor:"red"}} onClick={this.publishArticle.bind(this)} style={{ marginLeft: 10 }}> 发布</Button>
                            </div>
                        </div>
                        <div className="e_tags">
                            <span style={{ marginRight: 3 }}>标签：</span>
                            <div style={{ flex: 1 }}>
                                <EditableTagGroup
                                    onConfirm={(newTags) => { this.updateTags(newTags, "add") }}
                                    onClose={(tag) => {
                                        this.updateTags(tag, "delete")
                                    }}
                                    tags={this.props.article.tags || []}
                                >
                                </EditableTagGroup>
                            </div>
                        </div>
                    </div>
                }
                <div style={{ flex: 1, overflow: "hidden", display: content || content == "" ? "block" : "none" }}>
                    {this.state.loading && <Loading></Loading>}
                    <div id="editormd_container" style={{ width: "100%" }}>
                        <textarea onChange={() => { }} style={{ display: "none" }} value={content || ""}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}