import React, { Component } from "react";
// import axios from "axios";
import { Popover, Button, message } from "antd";
import CollectionList from "./components/collectionList"
// import "./edite.scss";
import api from "../../api/api";
import add_img from "../../assets/new.svg";
import page_img from "../../assets/page.svg";
import set_img from "../../assets/set.svg";
import edite_img from "../../assets/edite.svg";
import delete_img from "../../assets/delete.svg";

export default class Edite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionList: [],
            checkedCollection:{},
            articleList: [],
            checkedArticle: {},
        };
    }
    componentDidMount() {
        this.getCollections()
    }
    initEditor() {
        this.testEditor = window.editormd("editormd_container", {
            path: "/blog/lib/editor.md-master/lib/",
            width: "100%",
            height: "100%",
            syncScrolling: "single",
            saveHTMLToTextarea: true
        });
    }
    toHome() {
        this.props.history.replace("/home")
    }
    getCollections() {
        return api
            .post("article/getCollections")
            .then(res => {
                if(res.data){
                    this.setState({
                        collectionList:res.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    checkeCollection(collection) {
        this.setState({
            checkedCollection: collection
        });
        this.getArticleList(collection._id);
    }
    checkArticle(checkedArticle) {
        console.log("checkedArticle", checkedArticle)
        this.setState({
            checkedArticle: checkedArticle
        }, () => {
            this.initEditor()
        })
    }
    addNewCollections() {
        this.toggleCollections();
        api
            .post("article/addCollections", { title: this.state.collectionTitle })
            .then(res => {
                console.log(res);
                if (!res.err) {
                    var collections = this.state.collections ? this.state.collections : []
                    collections.push(res.data)
                    console.log("collections", collections)
                    this.setState({
                        collections: collections
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
   

    deleteCollection() {
        api.post("article/deleteCollection", {
                id: this.state.editeCollection._id
            })
            .then(res => {
                if (res.err === "offLine") {
                    this.props.history.push("/register", { type: "login" });
                } else if (res.data) {
                    console.log(res);
                    var index = this.state.editeCollection_index;
                    var collections = this.state.collections
                    collections.splice(index, 1)
                    this.setState({
                        collections: collections,
                        ["showEditeMenu" + index]: false
                    });
                }
            });
    }

    getArticleList(collectionId) {
        api.post("article/getArticleList", { collectionId: collectionId }).then(res => {
            console.log(11111, res);
            this.setState({
                checkedArticle: res.data[0],
                articleList: res.data
            }, () => {
                this.initEditor()
            });
        });
    }
    addNewArticle() {
        var articleList = this.state.articleList ? this.state.articleList : [];
        var date = new Date();
        var today = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
        api
            .post("article/addNewArticle", {
                collectionId: this.state.checkedCollection._id,
                title: today,
                content: "",
                isPublish: false
            })
            .then(res => {
                console.log(res);
                if (res.data) {
                    articleList.push(res.data)
                    this.setState({
                        articleList: articleList,
                        checkedArticle: articleList[0]
                    });
                }

            });
    }
    saveArticle() {
        var article = this.state.checkedArticle

        var content = this.testEditor.getMarkdown()

        api.post("article/saveArticle", {
            id: article._id,
            collectionId: article.collectionId,
            title: article.title,
            content: content
        }).then((res) => {
            console.log("res", res)
            if (res.err) {
                message.error('保存失败');
            } else {
                message.success('保存成功');
            }
        })
    }
    publishArticle() {

        var article = this.state.checkedArticle
        var content = this.testEditor.getMarkdown()

        api.post("article/publishArticle", {
            id: article._id,
            collectionId: article.collectionId,
            title: article.title,
            content: content
        }).then((res) => {
            if (res.err) {
                message.error('发布失败');
            } else {
                message.success('发布成功');
            }
        })
    }
 
  
    render() {
        return (
          <div>
              <CollectionList list = {this.state.collectionList}></CollectionList>
          </div>   
        );
    }
}