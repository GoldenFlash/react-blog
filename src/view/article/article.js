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
        this.initmarkdownView()

    }
    initmarkdownView(){
        // console.log(window.require)
        // requirejs.config({
        //     baseUrl: "../../lib/editor.md-master/lib/",
        //     paths: {
        //         jquery          : "../examples/js/jquery.min",
        //         marked          : "marked.min",
        //         prettify        : "prettify.min",
        //         raphael         : "raphael.min",
        //         underscore      : "underscore.min",
        //         flowchart       : "flowchart.min", 
        //         jqueryflowchart : "jquery.flowchart.min", 
        //         sequenceDiagram : "sequence-diagram.min",
        //         katex           : "//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min",
        //         editormd        : "../editormd.amd" // Using Editor.md amd version for Require.js
        //     },
        //     waitSeconds: 30
        // });
         var deps = [
                "../../lib/editormd.js",
                // "../../../public//lib/editor.md-master/lib/marked.min.js"
                // "./../lib/editor.md-master/languages/en", 
                // "./../lib/editor.md-master/plugins/link-dialog/link-dialog",
                // "./../lib/editor.md-master/plugins/reference-link-dialog/reference-link-dialog",
                // "./../lib/editor.md-master/plugins/image-dialog/image-dialog",
                // "./../lib/editor.md-master/plugins/code-block-dialog/code-block-dialog",
                // "./../lib/editor.md-master/plugins/table-dialog/table-dialog",
                // "./../lib/editor.md-master/plugins/emoji-dialog/emoji-dialog",
                // "./../lib/editor.md-master/plugins/goto-line-dialog/goto-line-dialog",
                // "./../lib/editor.md-master/plugins/help-dialog/help-dialog",
                // "./../lib/editor.md-master/plugins/html-entities-dialog/html-entities-dialog", 
                // "./../lib/editor.md-master/plugins/preformatted-text-dialog/preformatted-text-dialog"
            ];
        window.require(deps, function(editormd) {
                
                var content = this.props.location.state.article.content

                var testEditormdView = editormd.markdownToHTML("test-editormd-view", {
                    //markdown        : content ,//+ "\r\n" + $("#append-test").text(),
                    //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
                    //htmlDecode      : "style,script,iframe",  // you can filter tags decode
                    
                });
               
        });

    }
    render() {
            // var content = translateMarkdown(this.props.location.state.article.content)
            // console.log("content",content)
        return (
            <div className="article-detail">
            <span>
                content
            </span>    
                {/*
                     <div dangerouslySetInnerHTML={{ __html: content}}> 
                </div>
                */}
               
                 <div id="test-editormd-view">

                   <textarea style={{display:"none"}}  name="test-editormd-markdown-doc">###Hello world!</textarea>               
                
                </div>

            </div>
        );
    }
}
// export default Article;
